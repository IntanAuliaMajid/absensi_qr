import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem, ClassRoom, CursorPagination } from '@/types';
import { UserRound, MapPin, Clock3, GraduationCap } from 'lucide-react';
import { PaginationComponent } from '@/components/student/pagination-component';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/student/dashboard',
    },
    {
        title: 'Kelas',
        href: '/student/all-classes',
    },
];

type ClassPageProps = {
    classes: CursorPagination<ClassRoom>;
    q?: string;
};

export default function StudentAllClassesIndex() {
    const { classes, q } = usePage<ClassPageProps>().props;
    const keyword = q?.trim() ?? '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelas" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-[#F8FAFC] p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Semua Kelas
                    </h1>
                    <p className="text-sm text-slate-500">
                        {keyword === ''
                            ? 'Daftar seluruh kelas pada program studi Anda.'
                            : `Hasil pencarian: "${keyword}"`}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {classes.data.map((classRoom) => (
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
                                        ? `${classRoom.day ? `${classRoom.day}, ` : ''}${classRoom.start_time.slice(0, 5)} - ${classRoom.end_time.slice(0, 5)}`
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

                {classes.data.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        Belum ada data kelas.
                    </div>
                )}

                <PaginationComponent pagination={classes} />
            </div>
        </AppLayout>
    );
}
