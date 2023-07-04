import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width: number;
  height: number;
  specific?: string | null;
}

export default function Logo({
  width = 50,
  height = 100,
  specific = null,
}: LogoProps) {
  return (
    <>
      <Link href="/" className="flex align-center justify-center">
        {specific == 'dark' || specific == null ? (
          <Image
            width={width}
            height={height}
            src="/logo_bg_transp_dark.png"
            alt="Daily Manage Logo"
            className={specific == null ? "inline dark:hidden" : ''}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          ''
        )}
        {specific == 'light' || specific == null ? (
          <Image
            width={width}
            height={height}
            src="/logo_bg_transp_light.png"
            alt="Daily Manage Logo"
            className={specific == null ? "hidden dark:inline" : ''}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          ''
        )}
      </Link>
    </>
  );
}
