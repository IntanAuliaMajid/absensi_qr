export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Role = {
    id: number;
    name: string;
};

export type Faculty = {
    id: number;
    name: string;
};

export type StudyProgram = {
    id: number;
    name: string;
    faculty_id: number;
    faculty?: Faculty;
};

export type Semester = {
    id: number;
    name: string;
};

export type ClassRoom = {
    id: number;
    name: string;
    study_program_id?: number | null;
    semester_id?: number | null;
    lecturer_id?: number | null;
    room?: string | null;
    start_time?: string | null;
    end_time?: string | null;
    study_program?: StudyProgram;
    studyProgram?: StudyProgram;
    semester?: Semester;
    lecturer?: {
        id: number;
        user_id?: number;
        user?: {
            id?: number;
            name?: string;
        };
    };
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
    faculty: Faculty;
    studyProgram: StudyProgram;
};

export type AdminItem = {
    id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export type AdminPayload = {
    id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export type LecturerPayload = {
    id: number;
    user_id: number;
    nip: string;
    faculty_id: number;
    faculty?: Faculty;
    user: {
        id: number;
        name: string;
        email: string;
        address?: string | null;
    };
};


export type LecturerItem = {
    id: number;
    user_id: number;
    nip: string;
    faculty_id: number;
    faculty?: Faculty;
    user: {
        id: number;
        name: string;
        email: string;
        address?: string | null;
    };
};


export type StudentPayload = {
    id: number;
    user_id: number;
    nim: string;
    study_program_id?: number | null;
    gender?: string | null;
    date_of_birth?: string | null;
    studyProgram?: StudyProgram;
    study_program?: StudyProgram;
    user: {
        id: number;
        name: string;
        email: string;
        address?: string | null;
    };
};


export type StudentItem = {
    id: number;
    user_id: number;
    nim: string;
    study_program_id?: number | null;
    gender?: string | null;
    date_of_birth?: string | null;
    studyProgram?: StudyProgram;
    study_program?: StudyProgram;
    user: {
        id: number;
        name: string;
        email: string;
        address?: string | null;
    };
};