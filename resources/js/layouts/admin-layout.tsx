import { AppSidebar } from '@/components/admin/app-sidebar';
import RealtimeEmailChangedListener from '@/components/ui/realtime-email-changed-listener';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type PropsWithChildren, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <RealtimeEmailChangedListener />
            <AppSidebar />
            {children}
        </SidebarProvider>
    );
}
