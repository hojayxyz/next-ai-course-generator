import { Button } from '@/components/ui/button';
import Link from 'next/link';
function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <div className="text-2xl font-bold">AI Course Generator</div>
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
      {/* <div className="flex justify-between items-center">
        <div className="text-lg">Home</div>
        <div className="text-lg">About</div>
        <div className="text-lg">Contact</div>
      </div> */}
    </div>
  );
}
export default Header;
