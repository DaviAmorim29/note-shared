import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/Auth/AuthProvider';
import { NotesProvider } from '@/contexts/Note/NoteProvider';
import { queryClient } from '@/main';
import { QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';


export function MainLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NotesProvider>
                    <div className='flex min-h-screen flex-col items-center  p-24 bg-primary-foreground'>
                        <div className='bg-secondary w-[480px] p-6 rounded-md shadow-md'>
                            <Outlet />
                        </div>
                    </div>
                    <Toaster />
                </NotesProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
