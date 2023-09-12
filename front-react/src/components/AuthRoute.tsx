import { useAuth } from "@/contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
    children: React.ReactNode
}

export function AuthRoute({ children }: AuthRouteProps) {
    const { isAuth } = useAuth()

    return (
        isAuth ? <>{children}</> : <Navigate to="/" />
    )
}