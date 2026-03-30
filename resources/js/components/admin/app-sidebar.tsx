'use client';

import * as React from 'react';
import {
    GraduationCap,
    Shield,
    UserCog,
    Users,
    Book,
    BookOpen,
    PieChart,
} from 'lucide-react';

import { NavMain } from '@/components/admin/nav-main';
import { NavUser } from '@/components/admin/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/user/app-logo-icon';
import { Nav } from './nav';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url, props: pageProps } = usePage();
    const user = pageProps.auth?.user;
    const data = {
        user: {
            name: user.name,
            email: user.email,
            avatar: '/avatars/shadcn.jpg',
        },

        nav: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
                icon: PieChart,
                isActive: url.startsWith('/admin/dashboard'),
            },
        ],

        navMain: [
            {
                title: 'Student',
                url: '/admin/students',
                icon: GraduationCap,
                isActive: url.startsWith('/admin/students'),
                items: [
                    {
                        title: 'All Students',
                        url: '/admin/students',
                        isActive: url === '/admin/students',
                    },
                    {
                        title: 'Add Student',
                        url: '/admin/students/create',
                        isActive: url === '/admin/students/create',
                    },
                ],
            },
            {
                title: 'Lecturer',
                url: '/admin/lecturers',
                icon: Users,
                isActive: url.startsWith('/admin/lecturers'),
                items: [
                    {
                        title: 'All Lecturers',
                        url: '/admin/lecturers',
                        isActive: url === '/admin/lecturers',
                    },
                    {
                        title: 'Add Lecturer',
                        url: '/admin/lecturers/create',
                        isActive: url === '/admin/lecturers/create',
                    },
                ],
            },
            {
                title: 'Admin',
                url: '/admin/admins',
                icon: UserCog,
                isActive: url.startsWith('/admin/admins'),
                items: [
                    {
                        title: 'All Admins',
                        url: '/admin/admins',
                        isActive: url === '/admin/admins',
                    },
                    {
                        title: 'Add Admin',
                        url: '/admin/admins/create',
                        isActive: url === '/admin/admins/create',
                    },
                ],
            },
            {
                title: 'Role',
                url: '/admin/roles',
                icon: Shield,
                isActive: url.startsWith('/admin/roles'),
                items: [
                    {
                        title: 'All Roles',
                        url: '/admin/roles',
                        isActive: url === '/admin/roles',
                    },
                    {
                        title: 'Add Roles',
                        url: '/admin/roles/create',
                        isActive: url === '/admin/roles/create',
                    },
                ],
            },
            {
                title: 'Faculty',
                url: '/admin/faculties',
                icon: Book,
                isActive: url.startsWith('/admin/faculties'),
                items: [
                    {
                        title: 'All Faculties',
                        url: '/admin/faculties',
                        isActive: url === '/admin/faculties',
                    },
                    {
                        title: 'Add Faculty',
                        url: '/admin/faculties/create',
                        isActive: url === '/admin/faculties/create',
                    },
                ],
            },
            {
                title: 'Study Program',
                url: '/admin/study-programs',
                icon: BookOpen,
                isActive: url.startsWith('/admin/study-programs'),
                items: [
                    {
                        title: 'All Study Programs',
                        url: '/admin/study-programs',
                        isActive: url === '/admin/study-programs',
                    },
                    {
                        title: 'Add Study Programs',
                        url: '/admin/study-programs/create',
                        isActive: url === '/admin/study-programs/create',
                    },
                ],
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-2">
                    <AppLogoIcon className="h-10 w-10" />
                    <span className="font-semibold">Absensi</span>
                </div>
            </SidebarHeader>
            <Nav items={data.nav}></Nav>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
