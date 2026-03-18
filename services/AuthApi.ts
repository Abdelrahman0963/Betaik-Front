import api from "./Api"
export type UserLogin = {
    email: string
    password: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const logIn = (data: UserLogin) => {
    return api.post(`${API_BASE_URL}api/Dashboard/DashboardAuth/Login`, data)
}

type UserRefreshToken = {
    token: string
    refreshToken: string
    role: string
}
export const refeshToken = (data: UserRefreshToken) => {
    return api.post(`${API_BASE_URL}api/Dashboard/DashboardAuth/RefreshToken`, data)
}

type TempPassword = {
    email: string
}
export const tempPassword = (data: TempPassword) => {
    return api.post(`${API_BASE_URL}api/Dashboard/DashboardAuth/check-temp-password`, data)
}

type ChangePassword = {
    newPassword: string
    confirmPassword: string
}
export const changePassword = (data: ChangePassword) => {
    return api.post(`${API_BASE_URL}api/Dashboard/DashboardAuth/force-change-password`, data)
}