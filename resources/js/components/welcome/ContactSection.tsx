export default function ContactSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                    <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
                        Hubungi Kami
                    </span>
                    <h2 className="mt-3 text-3xl leading-tight font-extrabold text-gray-900">
                        Ada pertanyaan? <br />
                        Kami siap membantu Anda.
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Jangan ragu untuk menghubungi kami melalui form di
                        samping atau langsung lewat kontak di bawah.
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
                                    Jl. Raya Telang, PO BOX 2 Kamal, Bangkalan,
                                    Jawa Timur
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
    );
}
