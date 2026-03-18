import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
});
api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
api.interceptors.response.use(
    (response) => response, // لو الطلب نجح عديه عادي
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get("refreshToken");
                const token = Cookies.get("token");
                const user = JSON.parse(Cookies.get("user") || "{}");
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/Dashboard/DashboardAuth/RefreshToken`, {
                    token: token,
                    refreshToken: refreshToken,
                    role: user.role
                });

                if (res.status === 200) {
                    const { token: newToken, refreshToken: newRefreshToken } = res.data;
                    Cookies.set("token", newToken);
                    Cookies.set("refreshToken", newRefreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                Cookies.remove("token");
                Cookies.remove("refreshToken");
                Cookies.remove("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;