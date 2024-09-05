import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
function Header() {
  const logoImage = '/logo.svg';
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Link href="/dashboard">
        <Image src={logoImage} width={40} height={40} alt="Logo" />
      </Link>
      <UserButton />
    </div>
  );
}
export default Header;
