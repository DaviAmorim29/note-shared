import { createContext, useContext } from "react";

export interface IUser {
    id: string;
    username: string;
    token: string;
}
interface IAuthContext {
    user: IUser | null;
    setLoginData: (user: IUser) => Promise<void>;
    logout: () => void;
    isAuth: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext)