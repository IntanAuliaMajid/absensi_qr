import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/student/app-logo-icon';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import type { WelcomeProps } from '@/components/welcome/types';

export default function WelcomeNavbar({ auth, canRegister }: WelcomeProps) {
    return (
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
            <div className="flex items-center gap-4">
                {auth.user ? (
                    <Link href={dashboard().url}>
                        <Button className="rounded-full bg-blue-800 px-6 text-white hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                            Dashboard
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link
                            href={login().url}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Sign in
                        </Link>
                        {canRegister && (
                            <Link href={register().url}>
                                <Button className="rounded-full bg-slate-900 px-6 text-white transition-all hover:scale-105 hover:bg-black active:scale-95 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                                    Join for Free
                                </Button>
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
