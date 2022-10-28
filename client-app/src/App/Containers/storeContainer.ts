import { useContext, createContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore,
}

export const container: Store = {
    activityStore: new ActivityStore(),
}

export const storeContext = createContext(container);

export function UseStore() {
    return useContext(storeContext);
}