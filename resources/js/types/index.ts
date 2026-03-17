export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Role = {
    id: number;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    type?: 'student' | 'lecturer' | 'admin';
    nim?: string;
    nip?: string;
    gender?: string | null;
    date_of_birth?: string | null;
    address?: string | null;
    avatar?: string;
};

export type PageProps = {
    role: Role;
    user: User;
};