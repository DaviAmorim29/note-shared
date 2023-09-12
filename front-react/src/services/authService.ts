import { API_URL } from '@/common/contants';
import { useMutation } from 'react-query';

interface LoginResponse {
    id: string;
    username: string;
    token: string;
}

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

const loginFakeAPI = async (username: string): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        id: '1',
        username,
        token: '123213'
    }
}

export const logout = () => {}

export const useLogin = () => {
    return useMutation(loginAPI);
};
