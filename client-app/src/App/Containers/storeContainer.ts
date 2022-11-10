import { useContext, createContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalsStore from "./modalsStore";
import UserStore from "./userstore";

interface Store {
    activityStore: ActivityStore,
    commonStore: CommonStore,
    userStore: UserStore,
    modalsStore: ModalsStore,
}

export const container: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalsStore: new ModalsStore(),
}

export const storeContext = createContext(container);

export function UseStore() {
    return useContext(storeContext);
}