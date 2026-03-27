import { Head } from '@inertiajs/react';
import {
    ContactSection,
    CtaBannerSection,
    FeatureHighlightsSection,
    HeroSection,
    StudyProgramsSection,
    WelcomeFooter,
    WelcomeNavbar,
} from '@/components/welcome';
import type { WelcomeProps } from '@/components/welcome/types';

export default function Welcome({ auth, canRegister }: WelcomeProps) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Head title="Sistem Absensi" />

            <WelcomeNavbar auth={auth} canRegister={canRegister} />

            <main>
                <HeroSection />
                <StudyProgramsSection />
                <FeatureHighlightsSection />
                <CtaBannerSection />
                <ContactSection />
            </main>

            <WelcomeFooter />
        </div>
    );
}
