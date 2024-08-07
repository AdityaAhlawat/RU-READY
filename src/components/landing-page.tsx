/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/JAuZHPxoZT0
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export function LandingPage() {
  return (
    <div key="1" className="flex flex-col h-screen">
      <header className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="#">
            <CompassIcon className="h-6 w-6" />
            <span className="sr-only">RU Ready</span>
          </Link>
          <span className="text-lg font-medium">RU Ready</span>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <section className="bg-red-500 text-white py-8 px-6">
          <div className="flex flex-col items-center justify-center">
            <PinIcon className="h-24 w-24 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Welcome to RU Ready</h1>
            <p className="text-lg mb-6">Connecting Rutgers students for sports, study, and more using a revolutionary ping system</p>
            {/* <div className="mb-6"> */}
              {/* Video placeholder */}
              {/* <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg shadow-md">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div> */}
            {/* </div> */}
            <Button className="bg-white text-red-500 hover:bg-red-100 px-6 py-3 rounded-full font-medium" size="lg">
              <Link href="/signin">Get Started</Link>
            </Button>
          </div>
        </section>
        <section className="py-8 px-6">
          <h2 className="text-2xl font-bold mb-4">What is RU Ready?</h2>
          <p className="text-lg mb-6">
            RU Ready is a platform that helps Rutgers students connect with each other for various activities and
            events. Whether you are looking to play sports, study in a group, or attend a hackathon, RU Ready makes it
            easy to find and join like-minded individuals.
          </p>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <ShoppingBasketIcon className="h-8 w-8 mb-2" />
                <p className="text-lg font-medium">Sports</p>
                <p className="text-gray-500">Connect with others for sports activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <BookIcon className="h-8 w-8 mb-2" />
                <p className="text-lg font-medium">Study Groups</p>
                <p className="text-gray-500">Find study groups for your classes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <LightbulbIcon className="h-8 w-8 mb-2" />
                <p className="text-lg font-medium">Events</p>
                <p className="text-gray-500">Discover and join campus events</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <UsersIcon className="h-8 w-8 mb-2" />
                <p className="text-lg font-medium">Community</p>
                <p className="text-gray-500">Connect with fellow Rutgers students</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <InfoIcon className="h-6 w-6" />
          <span>About Us</span>
        </Link>
      </footer>
    </div>
  )
}

function BookIcon(props : any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function CompassIcon(props : any) {
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function InfoIcon(props : any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function LightbulbIcon(props : any) {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function MenuIcon(props : any ) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PinIcon(props : any) {
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
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  )
}


function PlusIcon(props : any) {
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
  )
}


function ShoppingBasketIcon(props : any) {
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
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  )
}


function UsersIcon(props : any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
