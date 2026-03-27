export default function HeroSection() {
    return (
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
                    Silakan pilih program studi sesuai mata kuliah yang Anda
                    tuju untuk masuk ke sistem ABS sesuai peran Anda.
                </p>
            </div>
        </section>
    );
}
