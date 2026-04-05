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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import { StudentPayload, StudyProgram } from '@/types';

export default function EditUserPage() {
    const { student, studyPrograms } = usePage<{
        student: StudentPayload;
        studyPrograms: StudyProgram[];
    }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: student.user.name,
        email: student.user.email,
        nim: student.nim ?? '',
        study_program_id: student.study_program_id
            ? String(student.study_program_id)
            : '',
        gender: student.gender ?? '',
        date_of_birth: student.date_of_birth ?? '',
        address: student.user.address ?? '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/students/${student.id}`, {
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
                                    <BreadcrumbLink href="/admin/students">
                                        Students
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Edit Student
                                    </BreadcrumbPage>
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
                            Edit Student
                        </h1>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Enter Name"
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
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="Enter Email"
                                className={
                                    errors.email
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.email && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="nim">NIM</FieldLabel>
                            <Input
                                id="nim"
                                value={data.nim}
                                onChange={(e) => setData('nim', e.target.value)}
                                placeholder="Enter NIM"
                                className={
                                    errors.nim
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.nim && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.nim}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="study_program_id">
                                Study Program
                            </FieldLabel>
                            <Select
                                value={data.study_program_id}
                                onValueChange={(value) =>
                                    setData('study_program_id', value)
                                }
                            >
                                <SelectTrigger
                                    id="study_program_id"
                                    className={
                                        errors.study_program_id
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select study program" />
                                </SelectTrigger>
                                <SelectContent>
                                    {studyPrograms.map((program) => (
                                        <SelectItem
                                            key={program.id}
                                            value={String(program.id)}
                                        >
                                            {program.name}
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
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <Select
                                value={data.gender}
                                onValueChange={(value) =>
                                    setData('gender', value)
                                }
                            >
                                <SelectTrigger
                                    id="gender"
                                    className={
                                        errors.gender
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                        Female
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.gender && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.gender}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="date_of_birth">
                                Date of Birth
                            </FieldLabel>
                            <Input
                                id="date_of_birth"
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData('date_of_birth', e.target.value)
                                }
                                className={
                                    errors.date_of_birth
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.date_of_birth && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.date_of_birth}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                placeholder="Enter Address"
                                className={
                                    errors.address
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.address && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.address}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="password">
                                New Password
                            </FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Leave blank if unchanged"
                                className={
                                    errors.password
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.password && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.password}
                                </p>
                            )}

                            <FieldDescription>
                                Kosongkan jika tidak ingin mengganti password.
                            </FieldDescription>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="password_confirmation">
                                Password Confirmation
                            </FieldLabel>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                placeholder="Repeat new password"
                                className={
                                    errors.password_confirmation
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.password_confirmation && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </Field>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Update Student'}
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
