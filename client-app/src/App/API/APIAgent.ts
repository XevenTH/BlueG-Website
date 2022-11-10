import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { container } from "../Containers/storeContainer";
import { Activity } from "../Models/Activity";
import { User, UserFormValues } from "../Models/User";

axios.defaults.baseURL = "http://localhost:5000/api";

const responsePayload = <T>(res: AxiosResponse<T>) => res.data;

const loading = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.request.use(config => {
    const token = container.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;

    return config
})

axios.interceptors.response.use(async res => {
    await loading(1000);
    return res;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    
    const datas: any = data;

    console.log(datas);

    switch (status) {
        case 400:
            if(typeof datas === 'string') toast.error(datas);
        
            if(config.method === 'get' && datas.errors.hasOwnProperty('id')) history.push('/not-found');

            if(datas.errors)
            {
                const stateArray = [];
                for(const key in datas.errors)
                {
                    if(datas.errors[key])
                    {
                        stateArray.push(datas.errors[key]);
                    }
                }
                throw stateArray.flat();
            }
            break;
        case 401:
            toast.error('Unautorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            container.commonStore.SetserverError(datas);
            history.push('/server-error')
            break;
    }

    return Promise.reject(error);
})

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responsePayload),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsePayload),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsePayload),
    delete: <T>(url: string) => axios.delete<T>(url).then(responsePayload),
};

const activityHandler = {
    List: () => request.get<Activity[]>('/activities'),
    details: (id: String) => request.get<Activity>(`/activities/${id}`),
    post: (activity: Activity) => request.post<void>(`/activities/`, activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
};

const Account = {
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user),
    getUser: () => request.get<any>('/account'), 
}

const agent = {
    handler: activityHandler,
    Account,
};

export default agent;