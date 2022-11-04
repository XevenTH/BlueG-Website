import { useContext, createContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore,
    commonStore: CommonStore
}

export const container: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
}

export const storeContext = createContext(container);

export function UseStore() {
    return useContext(storeContext);
}