import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Search } from 'lucide-react';
import { NavFooter } from '@/components/student/nav-footer';
import { NavMain } from '@/components/student/nav-main';
import { NavUser } from '@/components/student/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { dashboard } from '@/routes/student';
import AppLogoIcon from '@/components/student/app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Kelas',
        href: '/student/classes',
        icon: BookOpen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { url } = usePage();
    const currentQuery = new URLSearchParams(url.split('?')[1] ?? '').get(
        'class_q',
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogoIcon className="h-10 w-10" />
                                <h2 className="font-semibold">Absensi</h2>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-2">
                    <SidebarGroupLabel>Cari Kelas</SidebarGroupLabel>
                    <form method="get" action="/student/search">
                        <SidebarInput
                            name="class_q"
                            defaultValue={currentQuery ?? ''}
                            placeholder="Nama kelas / dosen"
                        />
                    </form>
                </SidebarGroup>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
