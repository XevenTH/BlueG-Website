import { User } from "./User";

export interface Profile {
    userName: string,
    displayName: string,
    bio: string,
    image?: string
    photos?: Photo[]
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string,
    url: string,
    isMain: boolean
}

export class AboutInitialModel {
    displayName: string = ''
    bio: string = ''

    constructor(value?: AboutInitialModel) {
        if (value) {
            this.displayName = value.displayName;
            this.bio = value.bio;
        }
    }

}