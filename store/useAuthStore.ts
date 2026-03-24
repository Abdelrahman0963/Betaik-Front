import { create } from "zustand";
import Cookies from "js-cookie";
interface AuthState {
    user: any | null;
    token: string | null;
    refreshToken: string | null;
    isTempPassword: boolean;
    setAuth: (data: any) => void;
    logout: () => void;
}



export const useAuthStore = create<AuthState>((set, refresh) => {
    // دالة مساعدة لقراءة الكوكي بأمان
    const getSafeUser = () => {
        try {
            const cookieValue = Cookies.get("user");
            if (cookieValue && cookieValue !== "undefined") {
                return JSON.parse(cookieValue);
            }
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
        return null;
    };


    const savedUser = getSafeUser();
    const savedToken = Cookies.get("token") || null;

    return {
        user: savedUser,
        token: savedToken,
        refreshToken: Cookies.get("refreshToken") || null,
        isTempPassword: false,

        setAuth: (data) => {
            const cookieOptions = { expires: 7, secure: true, sameSite: 'strict' as const };

            Cookies.set("token", data.token, cookieOptions);
            Cookies.set("refreshToken", data.refreshToken, cookieOptions);
            Cookies.set("user", JSON.stringify(data.user), cookieOptions);
            set({
                user: data.user,
                token: data.token,
                refreshToken: data.refreshToken,
                isTempPassword: data.isTempPassword || false
            });
        },

        logout: () => {
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            Cookies.remove("user");
            set({ user: null, token: null, refreshToken: null, isTempPassword: false });
        },
    };
});