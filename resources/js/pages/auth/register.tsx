import { Form, Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import InputError from '@/components/student/input-error';
import TextLink from '@/components/student/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { usePage } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type StudyProgram = {
    id: number;
    name: string;
    faculty_id: number;
};

type Faculty = {
    id: number;
    name: string;
};

export default function Register() {
    const { faculties, studyPrograms } = usePage<{
        faculties: Faculty[];
        studyPrograms: StudyProgram[];
    }>().props;

    const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
    const [selectedStudyProgramId, setSelectedStudyProgramId] =
        useState<string>('');

    const filteredStudyPrograms = useMemo(() => {
        if (!selectedFacultyId) {
            return [];
        }

        return studyPrograms.filter(
            (studyProgram) =>
                String(studyProgram.faculty_id) === selectedFacultyId,
        );
    }, [selectedFacultyId, studyPrograms]);

    return (
        <AuthLayout
            title="Buat akun baru"
            description="Masukkan data diri kamu untuk membuat akun"
        >
            <Head title="Daftar" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="faculty_id">Fakultas</Label>
                                <Select
                                    value={selectedFacultyId}
                                    onValueChange={(value) => {
                                        setSelectedFacultyId(value);
                                        setSelectedStudyProgramId('');
                                    }}
                                >
                                    <SelectTrigger id="faculty_id" tabIndex={3}>
                                        <SelectValue placeholder="Pilih fakultas" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {faculties.map((faculty) => (
                                            <SelectItem
                                                key={faculty.id}
                                                value={String(faculty.id)}
                                            >
                                                {faculty.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="study_program_id">
                                    Program Studi
                                </Label>
                                <input
                                    type="hidden"
                                    name="study_program_id"
                                    value={selectedStudyProgramId}
                                />
                                <Select
                                    value={selectedStudyProgramId}
                                    onValueChange={setSelectedStudyProgramId}
                                >
                                    <SelectTrigger
                                        id="study_program_id"
                                        tabIndex={4}
                                        disabled={!selectedFacultyId}
                                    >
                                        <SelectValue placeholder="Pilih program studi" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60 overflow-y-auto">
                                        {filteredStudyPrograms.map(
                                            (studyProgram) => (
                                                <SelectItem
                                                    key={studyProgram.id}
                                                    value={String(
                                                        studyProgram.id,
                                                    )}
                                                >
                                                    {studyProgram.name}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.study_program_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nim">NIM</Label>
                                <Input
                                    id="nim"
                                    type="text"
                                    required
                                    tabIndex={5}
                                    autoComplete="nim"
                                    name="nim"
                                    placeholder="23xxxxxx"
                                />
                                <InputError message={errors.nim} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={7}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={8}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Buat Akun
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <TextLink href={login()} tabIndex={9}>
                                Masuk
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
