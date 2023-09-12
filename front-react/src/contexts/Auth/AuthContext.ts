import { createContext, useContext } from "react";

export interface IUser {
    token: string
    user: {
        id: string;
        name: string;
        createdAt: Date
        updatedAt: Date
    }
}
interface IAuthContext {
    user: IUser | null;
    setLoginData: (user: IUser) => Promise<void>;
    logout: () => void;
    isAuth: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext)