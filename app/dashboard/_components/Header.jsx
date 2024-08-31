import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src={'logo.svg'} width={40} height={40} />
      <UserButton />
    </div>
  );
}
export default Header;
