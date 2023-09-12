import { useLocalStorage } from "@/hooks/useLocalStorage";
import { socket } from "@/lib/utils";
import * as authService from "@/services/authService";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, IUser } from "./AuthContext";


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate()
    const isAuth = !!user;
    const setLoginData = async (user: IUser) => {
        setUser(user);
        navigate('/notes', { replace: true })
        if (socket) {
            socket.io.opts = {
                query: {
                    token: user.token
                }
            }
        }
        socket.connect();
    }

    const logout = async () => {
        authService.logout();
        setUser(null);
        socket.disconnect();
        navigate('/login')
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setLoginData,
                logout,
                isAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}