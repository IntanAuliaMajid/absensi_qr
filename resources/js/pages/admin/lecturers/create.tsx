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
import { Faculty } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Page() {
    const { faculties } = usePage<{ faculties: Faculty[] }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nip: '',
        faculty_id: null as number | null,
        address: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/lecturers', {
            onSuccess: () => reset(),
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
                                    <BreadcrumbLink href="/admin/lecturers">
                                        Lecturers
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Add Lecturer
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
                            Add Lecturer
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

                            <FieldDescription>
                                Choose a unique email.
                            </FieldDescription>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="nip">NIP</FieldLabel>
                            <Input
                                id="nip"
                                value={data.nip}
                                onChange={(e) => setData('nip', e.target.value)}
                                placeholder="Enter NIP"
                                className={
                                    errors.nip
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : ''
                                }
                            />

                            {errors.nip && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.nip}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="faculty_id">
                                Faculty
                            </FieldLabel>
                            <Select
                                value={data.faculty_id?.toString()}
                                onValueChange={(value) =>
                                    setData('faculty_id', parseInt(value))
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.faculty_id
                                            ? 'border-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Select a faculty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculties.map((faculty) => (
                                        <SelectItem
                                            key={faculty.id}
                                            value={faculty.id.toString()}
                                        >
                                            {faculty.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.faculty_id && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.faculty_id}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                placeholder="Enter Address"
                                className={`rounded-lg border p-2 placeholder:text-sm ${
                                    errors.address
                                        ? 'border-red-500 focus-visible:ring-red-500'
                                        : 'border-gray-300'
                                }`}
                            />

                            {errors.address && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.address}
                                </p>
                            )}
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Enter Password"
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
                                placeholder="Enter Password Confirmation"
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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Lecturer'}
                        </Button>
                    </form>
                </div>
            </SidebarInset>
        </AdminLayout>
    );
}
