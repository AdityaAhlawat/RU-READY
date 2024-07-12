import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {signIn} from "../lib/auth"

export function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-gray-300 p-8 rounded-md shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            RU Ready
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect with Rutgers students for sports, study, and more.
          </p>
        </div>
        <form action={async (formData) => {
        "use server"
        await signIn("resend", formData)
        }}>
          <div>
            <Label className="sr-only" htmlFor="email">
              Rutgers Email address
            </Label>
            <div></div>
            <Input
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500"
              id="email"
              name="email"
              placeholder="Rutgers Email Address"
              required
              type="text"
            />
          </div>
          <div className="flex justify-center items-center">
            <div>
            <div className="mt-6"> </div>
            <button
                 className="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                 type="submit"
             >
                Sign in using Magic Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
