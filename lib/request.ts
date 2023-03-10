import axios from "axios";

export default function request ({ method, url, requiresAuth, params, data }: {method: string, url: string, requiresAuth?: boolean, params?: object, data?: any}) {
    if (!requiresAuth) {
        requiresAuth = false;
    }

    if (requiresAuth === true) {
        if (!axios.defaults.headers.common.Cookie) {
            throw new Error("No cookie has been set.");
        }
    }

    const config = {
        method,
        url,
        params,
        data
    };

    return axios(config);
}
