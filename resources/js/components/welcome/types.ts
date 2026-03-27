import type { ReactNode } from 'react';

export type WelcomeProps = {
    auth: { user: any | null };
    canRegister: boolean;
};

export type StudyProgram = {
    id: string;
    name: string;
    desc: string;
    color: string;
    shadow: string;
};

export type FeatureItem = {
    icon: ReactNode;
    title: string;
    desc: string;
};
