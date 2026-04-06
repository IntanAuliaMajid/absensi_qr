import { usePage } from '@inertiajs/react';
import { useConnectionStatus, useEcho } from '@laravel/echo-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type EmailChangedPayload = {
    message?: string;
};

export default function RealtimeEmailChangedListener() {
    const {
        auth: { user },
    } = usePage<{ auth: { user: { id: number } } }>().props;
    const connectionStatus = useConnectionStatus();
    const hasShownRealtimeError = useRef(false);

    useEcho(
        `user.${user.id}`,
        '.EmailChanged',
        (payload: EmailChangedPayload) => {
            toast.info(
                payload.message ?? 'Email kamu telah diubah oleh admin.',
            );
        },
        [user.id],
        'private',
    );

    useEffect(() => {
        if (connectionStatus !== 'failed') {
            hasShownRealtimeError.current = false;

            return;
        }

        if (hasShownRealtimeError.current || !import.meta.env.DEV) {
            return;
        }

        hasShownRealtimeError.current = true;
        toast.error('Koneksi realtime gagal. Coba refresh halaman.');
    }, [connectionStatus]);

    return null;
}