import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem, ClassRoom } from '@/types';
import { Badge } from '@/components/ui/badge';
import { UserRound, MapPin, Clock3, GraduationCap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/student/dashboard',
    },
    {
        title: 'Cari Kelas',
        href: '/student/search',
    },
];

type SearchPageProps = {
    classes: ClassRoom[];
    filters?: {
        class_q?: string;
    };
};

export default function StudentSearchIndex() {
    const { classes, filters } = usePage<SearchPageProps>().props;
    const keyword = filters?.class_q?.trim() ?? '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cari Kelas" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-[#F8FAFC] p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Pencarian Kelas
                    </h1>
                    <p className="text-sm text-slate-500">
                        Hasil pencarian kelas dari input di sidebar.
                    </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {keyword === ''
                        ? 'Menampilkan semua kelas pada program studi Anda.'
                        : `Hasil untuk: "${keyword}"`}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {classes.map((classRoom) => (
                        <div
                            key={classRoom.id}
                            className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            <div className="mb-4 flex items-start justify-between gap-2">
                                <div>
                                    <h2 className="line-clamp-2 text-base font-bold text-slate-900">
                                        {classRoom.name}
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {classRoom.study_program?.name ??
                                            classRoom.studyProgram?.name ??
                                            '-'}
                                    </p>
                                </div>
                                <Badge variant="secondary">Kelas</Badge>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <UserRound className="size-4 text-sky-600" />
                                    {classRoom.lecturer?.user?.name ?? '-'}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="size-4 text-sky-600" />
                                    {classRoom.room ?? '-'}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock3 className="size-4 text-sky-600" />
                                    {classRoom.start_time && classRoom.end_time
                                        ? `${classRoom.start_time.slice(0, 5)} - ${classRoom.end_time.slice(0, 5)}`
                                        : '-'}
                                </p>
                                <p className="flex items-center gap-2">
                                    <GraduationCap className="size-4 text-sky-600" />
                                    {classRoom.semester?.name ?? '-'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {classes.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        Tidak ada kelas yang cocok dengan pencarian Anda.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
