import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { useLogin } from "@/services/authService";
import { Loader } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";

export function LoginPage() {
    const { mutate: login, isLoading, isError, error } = useLogin()
    const navigate = useNavigate()
    const { setLoginData, isAuth } = useAuth()
    if (isAuth) {
        redirect('/notes')
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const input = event.currentTarget.elements.namedItem('username') as HTMLInputElement
        const username = input.value
        login(username, {
            onSuccess: (data) => {
                setLoginData(data);
                navigate('/notes')
            }
        });
    }
    return (
        <main>
            <Header.Container>
                <Header.Title>
                    Login
                </Header.Title>
            </Header.Container>
            <Header.Divider />
            <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                    <Input placeholder="Digite seu nome de usuario" name={'username'}/>
                    <Button disabled={isLoading} className="mt-6 w-full" type="submit">
                        {isLoading && <Loader   className="mr-2" size={16} />}
                        {isLoading ? 'Efetuando login...' : 'Login'}
                    </Button>
                    {isError && <p className="text-red-500 mt-4">{(error as Error).message}</p>}
                </form>
            </div>
        </main>
    )
}