import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../API/APIAgent";
import { AboutInitialModel, Photo, Profile } from "../Models/profile";
import { container } from "./storeContainer";

export default class ProfileStore {
    profile: Profile | null = null;
    loadProfile = false;
    uploading = false;
    loadFollowers = false;
    followingUsers: Profile[] = [];
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? "followers" : "following";
                    this.LoadFollowingFollowers(predicate);
                }
                else {
                    this.followingUsers = [];
                }
            }
        )
    }

    SetActiveTab = (index: any) => {
        this.activeTab = index;
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
                if (value) this.profile = { ...this.profile, ...value as Profile }
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

    LoadFollowingFollowers = async (predicate: string) => {
        this.loadFollowers = true
        try {
            const followers = await agent.Profiles.listFollow(this.profile!.userName, predicate);
            runInAction(() => {
                this.followingUsers = followers;
                this.loadFollowers = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadFollowers = false);
        }
    }

    FollowingFollowers = async (username: string, following: boolean) => {
        this.uploading = true;
        try {
            await agent.Profiles.updateFollow(username);
            container.activityStore.updateAttendee(username);
            runInAction(() => {
                if (this.profile && container.userStore.user?.userName !== this.profile.userName && container.userStore.user?.userName === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if(this.profile && this.profile.userName === container.userStore.user?.userName)
                {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                }
                this.followingUsers.forEach(profile => {
                    if (profile.userName === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
}