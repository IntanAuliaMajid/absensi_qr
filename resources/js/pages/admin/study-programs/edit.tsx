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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import { index } from '@/routes/admin/study-programs/index';
import { PageProps, Faculty, StudyProgram } from '@/types';

export default function EditStudyProgramPage() {
    const { studyProgram, faculties } = usePage<
        PageProps & { studyProgram: StudyProgram; faculties: Faculty[] }
    >().props;

    const { data, setData, put, processing, errors } = useForm({
        name: studyProgram.name,
        faculty_id: studyProgram.faculty_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/study-programs/${studyProgram.id}`, {
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
                                    <BreadcrumbLink href={index.url()}>
                                        Study Program
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Edit Study Program
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
                            Edit Study Program
                        </h1>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Enter Study Program name"
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
                                Choose a unique study program name.
                            </FieldDescription>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="faculty_id">
                                Faculty
                            </FieldLabel>
                            <Select
                                value={data.faculty_id.toString()}
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
                        </Field>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Update Study Program'}
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
