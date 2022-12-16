import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Comment } from "../Models/Comment";
import { container } from "./storeContainer";

export default class CommentStore {
    comments: Comment[] = [];
    signalrHub: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    MakeConnection = (activityId: string) => {
        if (activityId) {
            this.signalrHub = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + activityId, {
                    accessTokenFactory: () => container.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.signalrHub.start().catch(error => console.log('Error Connection' + error));

            this.signalrHub.on('LoadComments', ((comment: Comment[]) => {
                runInAction(() => {
                    comment.forEach(x => {
                        x.createdAt = new Date(x.createdAt);
                    });
                    this.comments = comment
                });
            }));

            this.signalrHub.on('ReceiveComment', ((comment: Comment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.push(comment);
                });
            }));
        }
    }

    SendComment = async (value: any) => {
        value.activityId = container.activityStore.selectedActivity?.id;
        try {
            await this.signalrHub?.invoke("SendComment", value);
        } catch (error) {
            console.log(error);
        }
    }

    stopConnection = () => {
        this.signalrHub?.stop().catch(error => 'Error Stop The Connection' + error);
    }

    clearComment = () => {
        this.comments = [];
        this.stopConnection();
    }
}