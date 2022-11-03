import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../API/APIAgent";
import { Activity } from "../Models/Activity";

export default class ActivityStore {
    activitiesMap = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    initialLoading = false;
    formMode: boolean = false;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get sortingActivitiesByDate() {
        return Array.from(this.activitiesMap.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get groupAllActivities() {
        return Object.entries(
            this.sortingActivitiesByDate.reduce((activitiyAcc, activityCurrentVal) => {
                const date = activityCurrentVal.date;
                activitiyAcc[date] = activitiyAcc[date] ?
                    [...activitiyAcc[date], activityCurrentVal] : [activityCurrentVal];

                return activitiyAcc;
            }, {} as { [key: string]: Activity[] })
        )
    }

    GetAllActivities = async () => {
        this.SetInitialLoading(true);
        try {
            const datas = await agent.handler.List();
            runInAction(() => {
                datas.forEach(data => {
                    data.date = data.date.split('T')[0];
                    this.activitiesMap.set(data.id, data);
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
        let activity = this.activitiesMap.get(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.SetInitialLoading(true);
            try {
                activity = await agent.handler.details(id)
                this.SetActivityMap(id, activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.SetInitialLoading(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.SetInitialLoading(true);
            }
        }
    }

    CreateActivity = async (activity: Activity) => {
        this.isSubmitting = true;
        try {
            let newActivity: Activity = {
                ...activity,
                id: uuid(),
            }

            await agent.handler.post(newActivity);
            runInAction(() => {
                this.activitiesMap.set(newActivity.id, newActivity);
                this.selectedActivity = newActivity;
                this.formMode = false;
                this.isSubmitting = false;
            })

            return newActivity;
        }
        catch (err) {
            console.log(err);
            runInAction(() => {
                this.isSubmitting = false;
            })
        }
    }

    UpdateActivity = async (activity: Activity) => {
        this.isSubmitting = true;
        try {
            await agent.handler.update(activity);
            runInAction(() => {
                this.activitiesMap.set(activity.id, activity);
                this.selectedActivity = activity;
                this.formMode = false;
                this.isSubmitting = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.isSubmitting = false;
            })
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

    SetInitialLoading = (state: boolean) => {
        this.initialLoading = state;
    }

    SetActivityMap = (id: string, activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activitiesMap.set(id, activity);
    }
}