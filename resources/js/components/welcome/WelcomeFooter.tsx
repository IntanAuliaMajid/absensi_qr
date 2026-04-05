import AppLogoIcon from '@/components/student/app-logo-icon';

export default function WelcomeFooter() {
    return (
        <footer className="border-t border-gray-100 bg-white py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 sm:flex-row">
                <div className="flex items-center gap-2">
                    <AppLogoIcon className="size-6 fill-current text-indigo-600" />
                    <span className="text-sm font-bold text-gray-700">
                        ABSENSI
                    </span>
                    <span className="text-xs text-gray-400">
                        &mdash; Sistem Absensi Digital
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
    );
}
