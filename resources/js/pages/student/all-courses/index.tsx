import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem, Course, CursorPagination } from '@/types';
import { UserRound, MapPin, Clock3, GraduationCap, Search } from 'lucide-react';
import { PaginationComponent } from '@/components/student/pagination-component';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/student/dashboard',
    },
    {
        title: 'Kelas',
        href: '/student/all-courses',
    },
];

type ClassPageProps = {
    courses: CursorPagination<Course>;
    q?: string;
};

export default function StudentAllcoursesIndex() {
    const { courses, q } = usePage<ClassPageProps>().props;
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

                    <form
                        method="get"
                        action="/student/all-classes"
                        className="relative mt-2 w-52 shrink-0 lg:w-64"
                    >
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            name="q"
                            defaultValue={keyword}
                            placeholder="Cari kelas..."
                            className="h-9 pl-9"
                        />
                    </form>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {courses.data.map((courses) => (
                        <div
                            key={courses.id}
                            className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <h6 className="line-clamp-2 flex-1 text-base font-bold text-slate-900">
                                    {courses.name}
                                </h6>

                                <p className="shrink-0 rounded-full bg-blue-100 px-3 py-1.5 text-xs whitespace-nowrap">
                                    {courses.classroom?.location?.name &&
                                    courses.classroom?.name
                                        ? `${courses.classroom.location.name} - ${courses.classroom.name}`
                                        : (courses.classroom?.name ??
                                          courses.room ??
                                          '-')}
                                </p>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <UserRound className="size-4 text-sky-600" />
                                    {courses.lecturer?.user?.name ?? '-'}
                                </p>

                                <p className="flex items-center gap-2">
                                    <Clock3 className="size-4 text-sky-600" />
                                    {courses.start_time && courses.end_time
                                        ? `${courses.day ? `${courses.day}, ` : ''}${courses.start_time.slice(0, 5)} - ${courses.end_time.slice(0, 5)}`
                                        : '-'}
                                </p>
                                <div className="flex gap-3">
                                    <p className="flex w-36 items-center justify-center gap-2 rounded-full bg-green-100 p-1.5">
                                        {courses.study_program?.name ??
                                            courses.studyProgram?.name ??
                                            '-'}
                                    </p>
                                    <p className="flex w-32 items-center justify-center gap-2 rounded-full bg-yellow-100 p-1.5">
                                        {courses.semester?.name ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {courses.data.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        Belum ada data kelas.
                    </div>
                )}

                <PaginationComponent pagination={courses} />
            </div>
        </AppLayout>
    );
}
