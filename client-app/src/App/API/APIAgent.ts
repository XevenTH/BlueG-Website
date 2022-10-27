import axios, { AxiosResponse } from "axios";
import { Activity } from "../Models/Activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responsePayload = <T>(res: AxiosResponse<T>) => res.data;

const loading = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async res => {
    try {
        await loading(1000);
        return res;
    } catch (error) {
        console.log(error);
        return await Promise.reject(res);
    }
})

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responsePayload),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsePayload),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsePayload),
    delete: <T>(url: string) => axios.delete<T>(url).then(responsePayload),
};

const handler = {
    List: request.get<Activity[]>('/activities'),
    details: (id: String) => request.get<Activity>(`/activities/${id}`),
    post: (activity: Activity) => request.post<void>(`/activities/`, activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
};

const agent = {
    handler
};

export default agent;