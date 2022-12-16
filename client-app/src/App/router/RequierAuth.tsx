import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UseStore } from "../Containers/storeContainer"

export default function RequireAuth() {
    const { userStore: { IsLogging } } = UseStore()
    const location = useLocation();

    if (!IsLogging) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return <Outlet />
}