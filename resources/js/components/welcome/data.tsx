import type { FeatureItem, StudyProgram } from '@/components/welcome/types';

export const studyPrograms: StudyProgram[] = [
    {
        id: 'tif',
        name: 'ABS TIF',
        desc: 'S1 Teknik Informatika',
        color: 'bg-blue-500',
        shadow: 'shadow-blue-100',
    },
    {
        id: 'si',
        name: 'ABS SI',
        desc: 'S1 Sistem Informasi',
        color: 'bg-indigo-500',
        shadow: 'shadow-indigo-100',
    },
    {
        id: 'ilkom',
        name: 'ABS ILKOM',
        desc: 'S1 Ilmu Komunikasi',
        color: 'bg-violet-500',
        shadow: 'shadow-violet-100',
    },
    {
        id: 'ak',
        name: 'ABS AK',
        desc: 'S1 Akuntansi',
        color: 'bg-sky-500',
        shadow: 'shadow-sky-100',
    },
    {
        id: 'mj',
        name: 'ABS MJ',
        desc: 'S1 Manajemen',
        color: 'bg-teal-500',
        shadow: 'shadow-teal-100',
    },
    {
        id: 'ep',
        name: 'ABS EP',
        desc: 'S1 Ekonomi Pembangunan',
        color: 'bg-cyan-500',
        shadow: 'shadow-cyan-100',
    },
    {
        id: 'd3ak',
        name: 'ABS D3 AK',
        desc: 'D3 Akuntansi',
        color: 'bg-emerald-500',
        shadow: 'shadow-emerald-100',
    },
    {
        id: 'd3ent',
        name: 'ABS D3 ENT',
        desc: 'D3 Entrepreneurship',
        color: 'bg-green-500',
        shadow: 'shadow-green-100',
    },
];

export const features: FeatureItem[] = [
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8H3m2 8H3m18-8h.01M18 20h.01"
                />
            </svg>
        ),
        title: 'QR Code Absensi',
        desc: 'Scan QR Code untuk mencatat kehadiran secara cepat dan akurat.',
    },
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        title: 'Laporan Real-time',
        desc: 'Pantau data kehadiran mahasiswa secara langsung dan transparan.',
    },
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        title: 'Multi Program Studi',
        desc: 'Mendukung seluruh program studi S1 dan D3 dalam satu platform.',
    },
];
