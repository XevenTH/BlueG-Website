import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../API/APIAgent";
import { User, UserFormValues } from "../Models/User";
import { container } from "./storeContainer";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get IsLogging() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const data = await agent.Account.login(creds);
            container.commonStore.setToken(data.token);

            runInAction(() => this.user = data);
            container.modalsStore.closeForm();
            history.push('/games');
        } catch (err) {
            throw err;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const data = await agent.Account.register(creds);
            container.commonStore.setToken(data.token);

            runInAction(() => this.user = data);
            container.modalsStore.closeForm();
            history.push('/games');
        } catch (err) {
            throw err;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.Account.getUser();
            runInAction(() => this.user = user);
        } catch (err) {
            console.log(err);
        }
    }

    logout = () => {
        container.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }

    SetPhotoProfile = (image: string) => {
        if(this.user) this.user.image = image
    }
}