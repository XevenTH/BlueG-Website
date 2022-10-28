import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/APIAgent";
import { Activity } from "../Models/Activity";
import { v4 as uuid } from "uuid";

export default class ActivitySotre {
    activitiesMap = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    initialLoading = false;
    formMode: boolean = false;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get sortingActivitiesByDate()  {
        return Array.from(this.activitiesMap.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    getAllActivities = async () => {
        this.SetInitialLoading(true);
        try {
            const datas = await agent.handler.List();
            datas.forEach(data => {
                data.date = data.date.split('T')[0];
                this.activitiesMap.set(data.id, data);
            })
            this.SetInitialLoading(false);
        }
        catch (err) {
            console.log(err);
            this.SetInitialLoading(false);
        }
    }

    CreateActivity = async (activity: Activity) => {
        this.isSubmitting = true;
        try {
            activity.id = uuid();
            await agent.handler.post(activity);
            runInAction(() => {
                this.activitiesMap.set(activity.id, activity);
                this.selectedActivity = activity;
                this.formMode = false;
                this.isSubmitting = false;
            })
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
                this.CancelActivityHandler();
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

    SelectActivityHandler = (id: string) => {
        this.selectedActivity = this.activitiesMap.get(id);
    }

    CancelActivityHandler = () => {
        this.selectedActivity = undefined;
    }

    FormModeHandler = (id?: string) => {
        id ? this.SelectActivityHandler(id) : this.CancelActivityHandler();
        this.formMode = true;
    }

    SetInitialLoading = (state: boolean) => {
        this.initialLoading = state;
    }
}