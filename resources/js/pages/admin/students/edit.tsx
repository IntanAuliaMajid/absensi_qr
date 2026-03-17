import AdminLayout from '@/layouts/AdminLayout';
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

type StudentPayload = {
    id: number;
    user_id: number;
    nim: string;
    gender?: string | null;
    date_of_birth?: string | null;
    user: {
        id: number;
        name: string;
        email: string;
        address?: string | null;
    };
};

export default function EditUserPage() {
    const { student } = usePage<{ student: StudentPayload }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: student.user.name,
        email: student.user.email,
        nim: student.nim ?? '',
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
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <Input
                                id="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData('gender', e.target.value)
                                }
                                placeholder="Male, Female, etc."
                                className={
                                    errors.gender
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

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
