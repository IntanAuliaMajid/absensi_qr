import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem, Course, CursorPagination } from '@/types';
import { Clock3, Search, UserRound } from 'lucide-react';
import { PaginationComponent } from '@/components/student/pagination-component';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
    enrolledCourseIds: number[];
};

export default function StudentAllcoursesIndex() {
    const { courses, q, enrolledCourseIds } = usePage<ClassPageProps>().props;
    const keyword = q?.trim() ?? '';
    const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(
        null,
    );

    const handleEnroll = (courseId: number) => {
        setEnrollingCourseId(courseId);

        router.post(
            `/student/all-classes/${courseId}/enroll`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setEnrollingCourseId(null),
            },
        );
    };

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
                    {courses.data.map((course) => {
                        const isEnrolled = enrolledCourseIds.includes(
                            course.id,
                        );
                        const isSubmitting = enrollingCourseId === course.id;

                        return (
                            <div
                                key={course.id}
                                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            >
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <h6 className="line-clamp-2 flex-1 text-base font-bold text-slate-900">
                                        {course.name}
                                    </h6>

                                    <p className="shrink-0 rounded-full bg-blue-100 px-3 py-1.5 text-xs whitespace-nowrap">
                                        {course.classroom?.location?.name &&
                                        course.classroom?.name
                                            ? `${course.classroom.location.name} - ${course.classroom.name}`
                                            : (course.classroom?.name ??
                                              course.room ??
                                              '-')}
                                    </p>
                                </div>

                                <div className="space-y-2 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <UserRound className="size-4 text-sky-600" />
                                        {course.lecturer?.user?.name ?? '-'}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Clock3 className="size-4 text-sky-600" />
                                        {course.start_time && course.end_time
                                            ? `${course.day ? `${course.day}, ` : ''}${course.start_time.slice(0, 5)} - ${course.end_time.slice(0, 5)}`
                                            : '-'}
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center justify-end">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={
                                            isEnrolled ? 'secondary' : 'default'
                                        }
                                        disabled={isEnrolled || isSubmitting}
                                        onClick={() => handleEnroll(course.id)}
                                    >
                                        {isEnrolled
                                            ? 'Terdaftar'
                                            : isSubmitting
                                              ? 'Mendaftarkan...'
                                              : 'Daftar Kelas'}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
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
