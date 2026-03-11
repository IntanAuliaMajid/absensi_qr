import { Head, Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/user/app-logo-icon';

const studyPrograms = [
    {
        id: 'tif',
        name: 'ABS TIF',
        desc: 'S1 Teknik Informatika',
        color: 'bg-blue-500',
        shadow: 'shadow-blue-100',
    },
    {
        id: 'si',
        name: 'ABS SI',
        desc: 'S1 Sistem Informasi',
        color: 'bg-indigo-500',
        shadow: 'shadow-indigo-100',
    },
    {
        id: 'ilkom',
        name: 'ABS ILKOM',
        desc: 'S1 Ilmu Komunikasi',
        color: 'bg-violet-500',
        shadow: 'shadow-violet-100',
    },
    {
        id: 'ak',
        name: 'ABS AK',
        desc: 'S1 Akuntansi',
        color: 'bg-sky-500',
        shadow: 'shadow-sky-100',
    },
    {
        id: 'mj',
        name: 'ABS MJ',
        desc: 'S1 Manajemen',
        color: 'bg-teal-500',
        shadow: 'shadow-teal-100',
    },
    {
        id: 'ep',
        name: 'ABS EP',
        desc: 'S1 Ekonomi Pembangunan',
        color: 'bg-cyan-500',
        shadow: 'shadow-cyan-100',
    },
    {
        id: 'd3ak',
        name: 'ABS D3 AK',
        desc: 'D3 Akuntansi',
        color: 'bg-emerald-500',
        shadow: 'shadow-emerald-100',
    },
    {
        id: 'd3ent',
        name: 'ABS D3 ENT',
        desc: 'D3 Entrepreneurship',
        color: 'bg-green-500',
        shadow: 'shadow-green-100',
    },
];

const features = [
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8H3m2 8H3m18-8h.01M18 20h.01"
                />
            </svg>
        ),
        title: 'QR Code Absensi',
        desc: 'Scan QR Code untuk mencatat kehadiran secara cepat dan akurat.',
    },
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        title: 'Laporan Real-time',
        desc: 'Pantau data kehadiran mahasiswa secara langsung dan transparan.',
    },
    {
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        title: 'Multi Program Studi',
        desc: 'Mendukung seluruh program studi S1 dan D3 dalam satu platform.',
    },
];

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Head title="Sistem Absensi" />

            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 px-8 py-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <AppLogoIcon className="size-10 fill-current text-indigo-600" />
                    <div>
                        <span className="block text-base font-extrabold tracking-tight text-gray-900">
                            ABSENSI
                        </span>
                        <span className="-mt-0.5 block text-[10px] font-medium text-gray-400">
                            Sistem Absensi Digital
                        </span>
                    </div>
                </div>
                <Link
                    href="/login"
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                >
                    Login
                </Link>
            </nav>

            <main>
                {/* Hero */}
                <section className="bg-white py-20 text-center">
                    <div className="mx-auto max-w-3xl px-4">
                        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                            Access System
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Pilih Akses Sistem{' '}
                            <span className="text-indigo-600">ABS</span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500">
                            Silakan pilih program studi sesuai mata kuliah yang
                            Anda tuju untuk masuk ke sistem ABS sesuai peran
                            Anda.
                        </p>
                    </div>
                </section>

                {/* Study Program Cards */}
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

                {/* Feature Highlights */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="mb-12 text-center">
                            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                                Fitur Unggulan
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                                Kenapa Menggunakan ABS?
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                            {features.map((f) => (
                                <div
                                    key={f.title}
                                    className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
                                        {f.icon}
                                    </div>
                                    <h3 className="mb-2 text-base font-bold text-gray-800">
                                        {f.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="relative mx-4 my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 py-20 text-white md:mx-8">
                    {/* decorative blobs */}
                    <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                            Sistem Absensi Digital
                            <br className="hidden sm:block" />
                            <span className="text-indigo-200">
                                {' '}
                                Berbasis QR Code
                            </span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                            Pelaporan real-time dan integrasi data mahasiswa
                            untuk efisiensi manajemen kehadiran akademik di
                            seluruh program studi.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <a
                                href="#program-studi"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 active:scale-95"
                            >
                                Pilih Akses Sistem
                            </a>
                            <a
                                href="mailto:absensi.sakera@gmail.com"
                                className="rounded-lg border border-indigo-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="mx-auto max-w-7xl px-4 py-20">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                                Hubungi Kami
                            </span>
                            <h2 className="mt-3 text-3xl leading-tight font-extrabold text-gray-900">
                                Ada pertanyaan? <br />
                                Kami siap membantu Anda.
                            </h2>
                            <p className="mt-4 text-gray-500">
                                Jangan ragu untuk menghubungi kami melalui form
                                di samping atau langsung lewat kontak di bawah.
                            </p>

                            <div className="mt-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Lokasi Kami
                                        </h4>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Jl. Raya Telang, PO BOX 2 Kamal,
                                            Bangkalan, Jawa Timur
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Email Kami
                                        </h4>
                                        <a
                                            href="mailto:absensi.sakera@gmail.com"
                                            className="mt-0.5 block text-sm text-indigo-500 hover:underline"
                                        >
                                            absensi.sakera@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100">
                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Kirim Pesan
                            </h3>
                            <form className="space-y-5">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="contoh@email.com"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        No. Telepon *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="081234567890"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        Pesan *
                                    </label>
                                    <textarea
                                        placeholder="Tulis pesan Anda di sini..."
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.98]"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-white py-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <AppLogoIcon className="size-6 fill-current text-indigo-600" />
                        <span className="text-sm font-bold text-gray-700">
                            ABSENSI
                        </span>
                        <span className="text-xs text-gray-400">
                            — Sistem Absensi Digital
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()}{' '}
                        <a
                            href="https://apigs.igsindonesia.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-500 hover:underline"
                        >
                            apigs.igsindonesia.org
                        </a>
                        . All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
}
