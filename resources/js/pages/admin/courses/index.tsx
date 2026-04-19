import AdminLayout from '@/layouts/admin-layout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Trash2, Pencil } from 'lucide-react';
import { Course, CursorPagination } from '@/types';
import { PaginationComponent } from '@/components/admin/pagination-component';

export default function Page() {
    const { courses } = usePage<{ courses: CursorPagination<Course> }>().props;

    const { delete: destroy, processing } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this class?')) {
            destroy(`/admin/courses/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/admin/courses">
                                        Class
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>All Class</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Manage Class</h1>
                        <Link href="/admin/courses/create">
                            <Button className="w-auto">Add</Button>
                        </Link>
                    </div>
                    <Table>
                        <TableCaption>A list of classes</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Study Program</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Lecturer</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.data.map((course) => {
                                const startTime = course.start_time;
                                const endTime = course.end_time;

                                return (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>
                                            {course.study_program?.name ??
                                                course.studyProgram?.name ??
                                                '-'}
                                        </TableCell>
                                        <TableCell>
                                            {course.semester?.name ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {course.lecturer?.user?.name ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {course.classroom?.building?.name &&
                                            course.classroom?.name
                                                ? `${course.classroom.building.name} - ${course.classroom.name}`
                                                : (course.classroom?.name ??
                                                  course.room ??
                                                  '-')}
                                        </TableCell>
                                        <TableCell>
                                            {course.day ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {startTime && endTime
                                                ? `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={processing}
                                                >
                                                    <Link
                                                        href={`/admin/courses/${course.id}/edit`}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={processing}
                                                    onClick={() =>
                                                        handleDelete(course.id)
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <PaginationComponent pagination={courses} />
                    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </AdminLayout>
    );
}
