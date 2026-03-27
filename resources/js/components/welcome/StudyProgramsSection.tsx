import { Link } from '@inertiajs/react';
import { studyPrograms } from '@/components/welcome/data';

export default function StudyProgramsSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-20">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {studyPrograms.map((prodi) => (
                    <div
                        key={prodi.id}
                        className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div
                            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${prodi.color} shadow-lg ${prodi.shadow} text-white`}
                        >
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-gray-800">
                            {prodi.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            {prodi.desc}
                        </p>
                        <Link
                            href="/login"
                            className="mt-5 w-full rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-gray-600 transition group-hover:border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            Masuk
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
