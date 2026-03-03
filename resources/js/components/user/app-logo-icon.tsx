import type { ImgHTMLAttributes } from 'react';

// The logo is now a static image placed in the public directory. Update the
// `src` value below if you used a different filename or subfolder.
export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <img
            {...props}
            src="/images/logo absensi.png" // adjust as needed
            alt="Application logo"
        />
    );
}
