import api from "./Api"
import Cookies from "js-cookie";
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

type Administrators = {
    fullName: string
    email: string
    password: string
}
export const administrators = (data: Administrators) => {
    return api.post(`${API_BASE_URL}api/Dashboard/DashboardAuth/create-admin`, data)
}

export const getAdministrators = () => {
    return api.get(`${API_BASE_URL}api/Dashboard/DashboardAuth/administrators`)
}

type CreateUniversity = {
    universityName: string
    universityEmail: string
    temporaryPassword: string
    duration: string
    orderNumber: number
    studentHousingLimit: number
    dormLimit: number
    paymentPlanLimit: number
    subAccountsLimit: number
}
export const createUniversity = (data: CreateUniversity) => {
    return api.post(`${API_BASE_URL}api/Admin/Universities/CreateUniversityAdmin`, data)
}

type CreateDeveloper = {
    fullName: string;
    address: string;
    email: string;
    tempPass: string;
    duration: string;
    orderNumber: number;
    compoundLimits: number;
    propertiesLimits: number;
    offersLimits: number;
    subAccountLimits: number;
    launchesLimits: number;
    paymentPlanLimits: number;
}
export const createDevelopers = (data: CreateDeveloper) => {
    return api.post(`${API_BASE_URL}api/Admin/Developers/Create`, data)
}

export const getDevelopers = () => {
    return api.get(`${API_BASE_URL}api/Admin/Developers/GetAll`)
}

export const deleteDeveloper = (id: string) => {
    return api.delete(`${API_BASE_URL}api/Admin/Developers/Delete/${id}`)
}

export const updateDeveloper = (data: CreateDeveloper) => {
    return api.put(`${API_BASE_URL}api/Admin/Developers/Update`, data)
}