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

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ClassRoom as ClassRoomType,
    LecturerItem,
    Semester,
    StudyProgram,
} from '@/types';

export default function EditClassPage() {
    const { classRoom, studyPrograms, semesters, lecturers } = usePage<{
        classRoom: ClassRoomType;
        studyPrograms: StudyProgram[];
        semesters: Semester[];
        lecturers: LecturerItem[];
    }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: classRoom.name,
        study_program_id: classRoom.study_program_id ?? null,
        semester_id: classRoom.semester_id ?? null,
        lecturer_id: classRoom.lecturer_id ?? null,
        room: classRoom.room ?? '',
        day: classRoom.day ?? '',
        start_time: classRoom.start_time?.slice(0, 5) ?? '',
        end_time: classRoom.end_time?.slice(0, 5) ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/classes/${classRoom.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/admin/classes">
                                        Class
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit Class</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="flex flex-1 items-center justify-center p-4">
                    <form
                        onSubmit={submit}
                        className="w-full max-w-md space-y-6"
                    >
                        <h1 className="text-center text-2xl font-semibold">
                            Edit Class
                        </h1>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Enter class name"
                                className={
                                    errors.name
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.name && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.name}
                                </p>
                            )}

                            <FieldDescription>
                                Choose a unique class name.
                            </FieldDescription>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="study_program_id">
                                Study Program
                            </FieldLabel>
                            <Select
                                value={data.study_program_id?.toString()}
                                onValueChange={(value) =>
                                    setData('study_program_id', parseInt(value))
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.study_program_id
                                            ? 'border-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select a study program" />
                                </SelectTrigger>
                                <SelectContent>
                                    {studyPrograms.map((studyProgram) => (
                                        <SelectItem
                                            key={studyProgram.id}
                                            value={studyProgram.id.toString()}
                                        >
                                            {studyProgram.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.study_program_id && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.study_program_id}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="semester_id">
                                Semester
                            </FieldLabel>
                            <Select
                                value={data.semester_id?.toString()}
                                onValueChange={(value) =>
                                    setData('semester_id', parseInt(value))
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.semester_id
                                            ? 'border-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select a semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters.map((semester) => (
                                        <SelectItem
                                            key={semester.id}
                                            value={semester.id.toString()}
                                        >
                                            {semester.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.semester_id && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.semester_id}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="lecturer_id">
                                Lecturer
                            </FieldLabel>
                            <Select
                                value={data.lecturer_id?.toString()}
                                onValueChange={(value) =>
                                    setData('lecturer_id', parseInt(value))
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.lecturer_id
                                            ? 'border-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select a lecturer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {lecturers.map((lecturer) => (
                                        <SelectItem
                                            key={lecturer.id}
                                            value={lecturer.id.toString()}
                                        >
                                            {lecturer.user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.lecturer_id && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.lecturer_id}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="room">Room</FieldLabel>
                            <Input
                                id="room"
                                value={data.room}
                                onChange={(e) =>
                                    setData('room', e.target.value)
                                }
                                placeholder="Enter room"
                                className={
                                    errors.room
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.room && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.room}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="day">Day</FieldLabel>
                            <Select
                                value={data.day}
                                onValueChange={(value) => setData('day', value)}
                            >
                                <SelectTrigger
                                    className={
                                        errors.day ? 'border-red-500' : ''
                                    }
                                >
                                    <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Senin">Senin</SelectItem>
                                    <SelectItem value="Selasa">
                                        Selasa
                                    </SelectItem>
                                    <SelectItem value="Rabu">Rabu</SelectItem>
                                    <SelectItem value="Kamis">Kamis</SelectItem>
                                    <SelectItem value="Jumat">Jumat</SelectItem>
                                    <SelectItem value="Sabtu">Sabtu</SelectItem>
                                    <SelectItem value="Minggu">
                                        Minggu
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.day && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.day}
                                </p>
                            )}
                        </Field>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field className="grid gap-2">
                                <FieldLabel htmlFor="start_time">
                                    Start Time
                                </FieldLabel>
                                <Input
                                    id="start_time"
                                    type="time"
                                    value={data.start_time}
                                    onChange={(e) =>
                                        setData('start_time', e.target.value)
                                    }
                                    className={
                                        errors.start_time
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                />

                                {errors.start_time && (
                                    <p className="text-sm font-medium text-red-500">
                                        {errors.start_time}
                                    </p>
                                )}
                            </Field>

                            <Field className="grid gap-2">
                                <FieldLabel htmlFor="end_time">
                                    End Time
                                </FieldLabel>
                                <Input
                                    id="end_time"
                                    type="time"
                                    value={data.end_time}
                                    onChange={(e) =>
                                        setData('end_time', e.target.value)
                                    }
                                    className={
                                        errors.end_time
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                />

                                {errors.end_time && (
                                    <p className="text-sm font-medium text-red-500">
                                        {errors.end_time}
                                    </p>
                                )}
                            </Field>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Update Class'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </AdminLayout>
    );
}
