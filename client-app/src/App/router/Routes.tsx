import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard'
import ActivityDetails from '../../Features/activities/details/ActivityDetails'
import TestErrors from '../../Features/activities/error/errorhandler'
import NotFound from '../../Features/activities/error/NotFound'
import Servererror from '../../Features/activities/error/servererror'
import ActivityForm from '../../Features/activities/form/ActivityForm'
import ProfilePage from '../../Features/activities/profiles/ProfilePage'
import App from '../Layout/App'
import RequireAuth from './RequierAuth'

export const Routes: RouteObject[] = [{
    path: '/',
    element: <App />,
    children: [
        {
            element: <RequireAuth />, children: [
                { path: 'games', element: <ActivityDashboard /> },
                { path: 'games/:id', element: <ActivityDetails /> },
                { path: 'createRoom', element: <ActivityForm key='create' /> },
                { path: 'editRoom/:id', element: <ActivityForm key='manage' /> },
                { path: 'profile/:username', element: <ProfilePage /> },
            ]
        },
        { path: 'server-error', element: <Servererror /> },
        { path: 'testerror', element: <TestErrors /> },
        { path: 'not-found', element: <NotFound /> },
        { path: '*', element: <Navigate replace to='/not-found' /> }
    ]
}]

export const router = createBrowserRouter(Routes);