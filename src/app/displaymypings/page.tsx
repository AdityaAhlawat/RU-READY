import { SessionProvider } from 'next-auth/react';
import DisplayMyAvailablePings from '@/components/display-my-available-pings';
import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '../../lib/auth';

export default async function displaymypings() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return (
    <SessionProvider session={session}>
      <header className="flex items-center justify-between h-16 px-4 bg-red-500 text-white">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Rutgers Student App</span>
        </Link>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button
            type="submit"
            className="px-4 py-2 bg-white text-red-500 rounded-md hover:bg-red-100 focus:outline-none md:ml-auto"
          >
            Sign Out
          </button>
        </form>
      </header>
      <main className="p-4">
        <DisplayMyAvailablePings />
      </main>
    </SessionProvider>
  );
}

function FrameIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}
