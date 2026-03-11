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
    institution: string;
    gender: string | null;
    date_of_birth: string | null;
    address: string | null;
};