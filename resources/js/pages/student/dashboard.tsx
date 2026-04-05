import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/student-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import {
    CalendarCheck,
    ClipboardList,
    UserMinus,
    BarChart3,
    Clock,
    MapPin,
    ArrowRight,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const userName = auth?.user?.name
        ? auth.user.name.split(' ')[0]
        : 'Mahasiswa';

    const chartData = [
        { name: 'Jan', kehadiran: 85 },
        { name: 'Feb', kehadiran: 92 },
        { name: 'Mar', kehadiran: 88 },
        { name: 'Apr', kehadiran: 95 },
        { name: 'Mei', kehadiran: 90 },
        { name: 'Jun', kehadiran: 98 },
    ];

    const stats = [
        {
            label: 'Total Kehadiran',
            value: '92%',
            icon: CalendarCheck,
            color: 'bg-sky-50 text-sky-600',
        },
        {
            label: 'Izin / Sakit',
            value: '2 Hari',
            icon: ClipboardList,
            color: 'bg-sky-50 text-sky-600',
        },
        {
            label: 'Alfa',
            value: '1',
            icon: UserMinus,
            color: 'bg-sky-50 text-sky-600',
        },
    ];

    const todayClasses = [
        {
            id: 1,
            subject: 'Pemrograman Web',
            time: '08:00 - 10:30',
            room: 'Lab Terpadu 1',
            status: 'Active',
        },
        {
            id: 2,
            subject: 'Basis Data Terdistribusi',
            time: '13:00 - 15:30',
            room: 'Ruang Kuliah 3.2',
            status: 'Upcoming',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Absensi" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-[#F8FAFC] p-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Selamat Datang, {userName}! 👋
                    </h1>
                    <p className="text-sm text-slate-500">
                        Ringkasan aktivitas dan jadwal absensi Anda.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-sky-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`rounded-xl p-3 ${stat.color}`}>
                                    <stat.icon className="size-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-black text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid Layout untuk Grafik dan Jadwal */}
                <div className="grid flex-1 gap-6 lg:grid-cols-3">
                    {/* Chart Section (2/3 Kolom) */}
                    <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-sky-50 p-2">
                                    <BarChart3 className="size-5 text-sky-600" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Statistik Kehadiran
                                </h2>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 20,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f1f5f9"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: '#94a3b8',
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow:
                                                '0 10px 15px -3px rgba(0,0,0,0.1)',
                                            padding: '12px',
                                        }}
                                    />
                                    <Bar
                                        dataKey="kehadiran"
                                        radius={[10, 10, 10, 10]}
                                        barSize={40}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    index ===
                                                    chartData.length - 1
                                                        ? '#0ea5e9'
                                                        : '#bae6fd'
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Jadwal Absensi Section (1/3 Kolom) */}
                    <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
                            <Clock className="size-5 text-sky-600" />
                            Jadwal Hari Ini
                        </h2>

                        <div className="flex flex-col gap-4">
                            {todayClasses.map((item) => (
                                <div
                                    key={item.id}
                                    className="group rounded-2xl border border-slate-50 bg-slate-50/50 p-4 transition-all hover:border-sky-200 hover:bg-sky-50/50"
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                                item.status === 'Active'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-slate-200 text-slate-500'
                                            }`}
                                        >
                                            {item.status === 'Active'
                                                ? 'Mulai'
                                                : 'Akan Datang'}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400">
                                            {item.time}
                                        </span>
                                    </div>
                                    <h3 className="mb-2 leading-tight font-bold text-slate-800">
                                        {item.subject}
                                    </h3>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <MapPin className="size-3" />
                                            {item.room}
                                        </div>
                                        {item.status === 'Active' && (
                                            <button className="flex items-center gap-1 text-xs font-bold text-sky-600 transition-all group-hover:gap-2">
                                                Absen{' '}
                                                <ArrowRight className="size-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {todayClasses.length === 0 && (
                                <p className="py-10 text-center text-sm text-slate-400">
                                    Tidak ada jadwal kuliah hari ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
