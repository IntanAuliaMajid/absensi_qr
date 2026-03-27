import { features } from '@/components/welcome/data';

export default function FeatureHighlightsSection() {
    return (
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
    );
}
