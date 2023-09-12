import { API_URL } from '@/common/contants';
import { IUser } from '@/contexts/Auth/AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import { logout } from './authService';

export interface INote {
    id: string;
    title: string;
    text: string;
    user: IUser['user'];
    collabs: IUser['user'][]
    createdAt: string;
    updatedAt: string;
}

interface AddNoteDTO {
    title: string;  
}

const getToken = () => {
    const user = localStorage.getItem('user')
    if (!user) {
        throw new Error('Usuário não encontrado')
    }
    const data = JSON.parse(user)
    return data.token
}

export const addNoteRequest = async (data: AddNoteDTO): Promise<INote> => {
    const response = await fetch(`${API_URL}/note`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Algum erro');
    }

    return response.json();
};

export const deleteNoteRequest = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/note/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Algum erro');
    }
    
    return
}

export const updateNote = async (data: UpdateNoteDTO): Promise<INote> => {
    const response = await fetch(`${API_URL}/note/${data.id}/${data.text ? 'text' : 'collab'}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Algum erro');
    }
    return response.json()
}

export const useDeleteNote = () => {
    return useMutation(deleteNoteRequest);
}

export const useUpdateNote = () => {
    return useMutation(updateNote);
}

export const useAddNote = () => {
    const queryclient = useQueryClient()
    return useMutation<INote,Error,AddNoteDTO,() => void>(
    async (item: AddNoteDTO) => {
      const response = await addNoteRequest(item);
      return response;
    },
    {
      onSuccess: () => {
        queryclient.invalidateQueries('notes');
      },
    },
  );
}


export type ReplaceType<T, K extends keyof T> = Omit<T, K> & { [P in K]: T[P] };

// export type UpdateNoteDTO = Partial<ReplaceType<INote, {  }>> & { id: string, collabs: string[] };

export type UpdateNoteDTO = {
    id: string
    text?: string
    collabs?: string[]
}

export const updateNoteMutation = () => {
    return useMutation(
        async (item: UpdateNoteDTO) => {
            const response = await updateNote(item)
            return response
        },
    );
}

export const deleteNoteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (id: string) => {
            const response = await deleteNoteRequest(id)
            return response
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('notes')
            }
        }
    );
}

export const getNotes = async (): Promise<INote[]> => {
    const token = getToken()
    const response = await fetch(`${API_URL}/note`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
            logout()
        }
        throw new Error(data.message || 'Algum erro');
    }
    return response.json();
}

// export const useNotes = (userId: string) => {
//     return useQuery(['notes', userId], () => getNotes);
// }