import { AppContent } from '@/components/student/app-content';
import { AppShell } from '@/components/student/app-shell';
import { AppSidebar } from '@/components/student/app-sidebar';
import { AppSidebarHeader } from '@/components/student/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
