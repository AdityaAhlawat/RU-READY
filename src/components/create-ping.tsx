import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import {signOut} from "../lib/auth"

export function CreatePing() {
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
      <section className="bg-white py-10 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto space-y-6 mt-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-red-500">Create a Ping</h2>
              <p className="text-gray-500">
                Let your fellow Rutgers students know about your upcoming activity.
              </p>
            </div>
            <Card className="bg-white shadow-lg rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-4">
                  <div>
                    <Label className="text-red-500" htmlFor="location">
                      Campus Location
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full justify-between bg-gray-50 text-gray-900 border border-gray-300">
                          <span>Select a campus location</span>
                          <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-full bg-white text-gray-900 border border-gray-200">
                        <DropdownMenuItem>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          Busch Campus
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          College Avenue Campus
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          Livingston Campus
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          Newark Campus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <Label className="text-red-500" htmlFor="specific-location">
                      Specific Location
                    </Label>
                    <div className="flex items-center">
                      <Input className="flex-1 bg-gray-50 text-gray-900 border border-gray-300" id="specific-location" placeholder="Enter a building or location" />
                      <Button className="ml-2" size="icon">
                        <MapIcon className="h-4 w-4" />
                        <span className="sr-only">Select location on map</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-red-500" htmlFor="description">
                      Description
                    </Label>
                    <Textarea className="h-20 border-gray-300" id="description" placeholder="Add a description of your activity" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-red-500" htmlFor="time">
                        Time
                      </Label>
                      <Input id="time" placeholder="Select a time" type="time" />
                    </div>
                    <div>
                      <Label className="text-red-500" htmlFor="date">
                        Date
                      </Label>
                      <Input id="date" placeholder="Select a date" type="date" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input id="happening-now" type="checkbox" className="mr-2" />
                    <Label className="text-red-500" htmlFor="happening-now">
                      Happening Now
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <div className="flex">
                      <Button className="mr-2">
                        Cancel
                      </Button>
                      <Button className="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" type="submit">
                        Create Ping
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function UserIcon(props : any) {
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

function FrameIcon(props : any) {
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

function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MapIcon(props : any) {
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
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

function MapPinIcon(props : any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
