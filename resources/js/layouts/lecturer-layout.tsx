import { AppSidebar } from '@/components/lecturer/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type PropsWithChildren, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

export default function LecturerLayout({ children }: PropsWithChildren) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar />
            {children}
        </SidebarProvider>
    );
}