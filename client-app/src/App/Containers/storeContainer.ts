import { useContext, createContext } from "react";
import ActivityStore from "./activityStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalsStore from "./modalsStore";
import ProfileStore from "./profileStore";
import UserStore from "./userstore";

interface Store {
    activityStore: ActivityStore,
    commonStore: CommonStore,
    userStore: UserStore,
    modalsStore: ModalsStore,
    ProfileStore: ProfileStore,
    commentStore: CommentStore
}

export const container: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalsStore: new ModalsStore(),
    ProfileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const storeContext = createContext(container);

export function UseStore() {
    return useContext(storeContext);
}