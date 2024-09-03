import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

function Header() {
  const logoImage = '/logo.svg';
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src={logoImage} width={40} height={40} />
      <UserButton />
    </div>
  );
}
export default Header;
