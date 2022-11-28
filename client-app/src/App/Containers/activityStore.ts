import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../API/APIAgent";
import { Activity, ActivityFormValues } from "../Models/Activity";
import { Profile } from "../Models/profile";
import { container } from "./storeContainer";

export default class ActivityStore {
    activitiesMap = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    initialLoading = true;
    formMode: boolean = false;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get sortingActivitiesByDate() {
        return Array.from(this.activitiesMap.values()).sort((a, b) => b.date!.getTime() - a.date!.getTime())
    }

    get groupAllActivities() {
        return Object.entries(
            this.sortingActivitiesByDate.reduce((activitiyAcc, activityCurrentVal) => {
                const date = format(activityCurrentVal.date!, 'dd MMM yyyy');
                activitiyAcc[date] = activitiyAcc[date] ?
                    [...activitiyAcc[date], activityCurrentVal] : [activityCurrentVal];

                return activitiyAcc;
            }, {} as { [key: string]: Activity[] })
        )
    }

    GetAllActivities = async () => {
        try {
            const datas = await agent.handler.List();
            runInAction(() => {
                datas.forEach(data => {
                    this.SetActivityMap(data);
                    this.SetInitialLoading(false);
                })
            })
        }
        catch (err) {
            console.log(err);
            this.SetInitialLoading(false);
        }
    }

    GetActivityById = async (id: string) => {
        this.SetInitialLoading(false);
        let activity = this.activitiesMap.get(id);
        if (activity) {
            this.selectedActivity = activity;
            this.SetInitialLoading(false);
            return activity;
        }
        else {
            try {
                activity = await agent.handler.details(id);
                runInAction(() => {
                    this.SetActivityMap(activity!);
                    this.selectedActivity = activity;
                    this.SetInitialLoading(false);
                })
                return activity;
            } catch (error) {
                console.log(error);
            }
        }
    }

    CreateActivity = async (activity: ActivityFormValues) => {
        const host = new Profile(container.userStore.user!);
        try {
            await agent.handler.post(activity);
            let newActivity = new Activity(activity);
            newActivity.id = uuid();
            newActivity.attendees = [host];
            newActivity.hostUserName = host.userName;
            newActivity.isHosting = true;
            this.SetActivityMap(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })

            return newActivity;
        }
        catch (err) {
            console.log(err);
        }
    }

    UpdateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.handler.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updateActivity = { ...this.activitiesMap.get(activity.id), ...activity };
                    this.activitiesMap.set(activity.id, updateActivity as Activity);
                    this.selectedActivity = updateActivity as Activity;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    DeleteActivity = async (id: string) => {
        this.isSubmitting = true;
        try {
            await agent.handler.delete(id);
            runInAction(() => {
                this.activitiesMap.delete(id);
                this.selectedActivity = undefined;
                this.formMode = false;
                this.isSubmitting = false;
            })

            return this.activitiesMap.values();

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.isSubmitting = false;
            })
        }
    }

    attendActivityAction = async () => {
        var user = container.userStore.user;
        this.isSubmitting = true;
        try {
            await agent.handler.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isJoined) {
                    this.selectedActivity.attendees = this.selectedActivity
                        .attendees?.filter(x => x.userName !== user?.userName);
                    this.selectedActivity.isJoined = false;
                }
                else {
                    const newUser = new Profile(user!);
                    this.selectedActivity?.attendees?.push(newUser);
                    this.selectedActivity!.isJoined = true;
                }
                this.activitiesMap.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => this.isSubmitting = false);
        }
    }

    CancelToggle = async () => {
        this.isSubmitting = true;
        try {
            await agent.handler.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activitiesMap.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.isSubmitting = false;
            })
        }
    }

    SetInitialLoading = async (state: boolean) => {
        return this.initialLoading = state;
    }

    timer = (delay: number) => {
        return new Promise((resolver) => {
            setTimeout(resolver, delay);
        })
    }

    SetActivityMap = (activity: Activity) => {
        var user = container.userStore.user;
        if (user) {
            activity.isHosting = user.userName === activity.hostUserName;
            activity.isJoined = activity.attendees?.some(x => x.userName === user?.userName);
            activity.hostProfile = activity.attendees?.find(x => x.userName === activity.hostUserName);
        }

        activity.date = new Date(activity.date!);
        this.activitiesMap.set(activity.id, activity);
    }

    ClearSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    updateAttendee = (username: string) => {
        this.activitiesMap.forEach(acticity => {
            acticity.attendees.forEach(profile => {
                if (profile.userName === username) {
                    profile.following ? profile.followersCount-- : profile.followersCount++;
                    profile.following = !profile.following;
                }
            })
        })
    }
}