import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "../lib/auth";

export function DashboardIntro() {
  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 bg-red-500 text-white">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Rutgers Student App</span>
        </Link>
        <form
          action={async () => {
            "use server";
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
      <main key="1" className="flex flex-col gap-8 p-4 md:p-8 lg:p-12 bg-white">
        <section className="grid gap-4 mt-16"> {/* Reduced the top margin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <EyeIcon className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-500 mb-2">View Pings</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Browse and join existing pings in your area.
              </p>
              <div className="w-full flex justify-center mt-auto">
                <a href="/displayavailablepins">
                  <Button className="w-auto">
                    View Pings
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <PlusIcon className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-500 mb-2">Create Ping</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Create a new ping to connect with others who share your interests.
              </p>
              <div className="w-full flex justify-center mt-auto">
                <a href="/createping">
                  <Button className="w-auto">
                    Create Ping
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <UserIcon className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-red-500 mb-2">Manage My Pings</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                View, edit, and delete your created pings.
              </p>
              <div className="w-full flex justify-center mt-auto">
                <a href="/displaymypings">
                  <Button className="w-auto">
                    Manage Pings
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
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

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
