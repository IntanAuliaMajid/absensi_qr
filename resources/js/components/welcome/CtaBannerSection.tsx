export default function CtaBannerSection() {
    return (
        <section className="relative mx-4 my-16 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-indigo-800 py-20 text-white md:mx-8">
            <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                    Sistem Absensi Digital
                    <br className="hidden sm:block" />
                    <span className="text-indigo-200"> Berbasis QR Code</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                    Pelaporan real-time dan integrasi data mahasiswa untuk
                    efisiensi manajemen kehadiran akademik di seluruh program
                    studi.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="#program-studi"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
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
    );
}
