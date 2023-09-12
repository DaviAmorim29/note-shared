import { API_URL } from '@/common/contants';
import { IUser } from '@/contexts/Auth/AuthContext';
import { useMutation } from 'react-query';

type LoginResponse = IUser

const loginAPI = async (username: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Algum erro');
    }

    return response.json();
};

export const logout = () => {
    localStorage.removeItem('user');
}

export const useLogin = () => {
    return useMutation(loginAPI);
};
