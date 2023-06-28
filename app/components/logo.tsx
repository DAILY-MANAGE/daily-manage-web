import Image from 'next/image';

interface LogoProps {
  width: number;
  height: number;
}

export default function Logo({ ...props }: LogoProps) {
  return (
    <>
      <Image
        width={50}
        height={100}
        src="/logo_bg_transp_dark.png"
        alt="Daily Manage Logo"
        className="inline dark:hidden"
        style={{ objectFit: 'contain' }}
      />
      <Image
        width={50}
        height={100}
        src="/logo_bg_transp_light.png"
        alt="Daily Manage Logo"
        className="hidden dark:inline"
        style={{ objectFit: 'contain' }}
      />
    </>
  );
}
