import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem, Course, CursorPagination } from '@/types';
import { UserRound, MapPin, Clock3, GraduationCap } from 'lucide-react';
import { PaginationComponent } from '@/components/student/pagination-component';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/student/dashboard',
    },
    {
        title: 'Kelas Saya',
        href: '/student/classes',
    },
];

type ClassPageProps = {
    courses: CursorPagination<Course>;
};

export default function StudentClassIndex() {
    const { courses } = usePage<ClassPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelas Saya" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-[#F8FAFC] p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Kelas Saya
                    </h1>
                    <p className="text-sm text-slate-500">
                        Daftar kelas yang Anda ambil semester ini.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {courses.data.map((course) => {
                        return (
                            <div
                                key={course.id}
                                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            >
                                <div className="mb-4 flex items-start justify-between gap-2">
                                    <div>
                                        <h2 className="line-clamp-2 text-base font-bold text-slate-900">
                                            {course.name}
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {course.study_program?.name ??
                                                course.studyProgram?.name ??
                                                '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <UserRound className="size-4 text-sky-600" />
                                        {course.lecturer?.user?.name ?? '-'}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin className="size-4 text-sky-600" />
                                        {course.classroom?.location?.name &&
                                        course.classroom?.name
                                            ? `${course.classroom.location.name} - ${course.classroom.name}`
                                            : (course.classroom?.name ??
                                              course.room ??
                                              '-')}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Clock3 className="size-4 text-sky-600" />
                                        {course.start_time && course.end_time
                                            ? `${course.day ? `${course.day}, ` : ''}${course.start_time.slice(0, 5)} - ${course.end_time.slice(0, 5)}`
                                            : '-'}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <GraduationCap className="size-4 text-sky-600" />
                                        {course.semester?.name ?? '-'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {courses.data.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        Anda belum terdaftar pada kelas mana pun.
                    </div>
                )}

                <PaginationComponent pagination={courses} />
            </div>
        </AppLayout>
    );
}
