import axios from "axios";

export default function request ({
    method,
    url,
    authRequired,
    params,
    data
}: {
    method: string;
    url: string;
    authRequired?: boolean;
    params?: object;
    data?: any;
}) {
    if (!authRequired) {
        authRequired = false;
    }

    if (authRequired === true) {
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
