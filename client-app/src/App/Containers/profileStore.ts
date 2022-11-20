import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/APIAgent";
import { AboutInitialModel, Photo, Profile } from "../Models/profile";
import { container } from "./storeContainer";

export default class ProfileStore {
    profile: Profile | null = null;
    loadProfile = false;
    uploading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedUser() {
        var loggedUser = container.userStore.user;
        if (loggedUser && this.profile) return loggedUser.userName === this.profile.userName;

        return false;
    }

    SetProfile = async (username: string) => {
        this.loadProfile = true;
        try {
            var profile = await agent.Profiles.profile(username);
            runInAction(() => {
                this.profile = profile;
                this.loadProfile = false;
            })

            return profile;
        }
        catch (error) {
            console.log(error);
            runInAction(() => this.loadProfile = false)
        }
    }

    UpdateBio = async (value: AboutInitialModel) => {
        const user = container.userStore.user;
        try {
            await agent.Profiles.updateBio(value);
            runInAction(() => {
                if (this.profile && this.profile.userName !== user?.userName) {
                    container.userStore.setDisplayName(value.displayName);
                }
                if(value) this.profile = {...this.profile, ...value as Profile}
            })
        } catch (error) {
            console.log(error);
        }
    }

    UploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const res = await agent.Profiles.uploadPhoto(file);
            const photo = res.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && container.userStore.user) {
                        container.userStore.SetPhotoProfile(photo.url);
                        this.profile.image = photo.url;
                    }
                }

                this.uploading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    SetMainPhoto = async (photo: Photo) => {
        this.uploading = true
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            container.userStore.SetPhotoProfile(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.uploading = true
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(x => x.id !== photo.id);
                }
            })
            this.uploading = false
        }
        catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
}