import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-gray-300 p-8 rounded-md shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            RU Ready
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Rutgers students for sports, study, and more. You must use a Rutgers Email to Sign Up!
          </p>
        </div>
        <form action="#" className="space-y-6" method="POST">
          <div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              autoComplete="name"
              className="relative block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500"
              id="name"
              name="name"
              placeholder="Name"
              required
              type="text"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email address
            </Label>
            <Input
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500"
              id="email"
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              autoComplete="new-password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="confirm-password">
              Confirm Password
            </Label>
            <Input
              autoComplete="new-password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
              type="password"
            />
          </div>
          <div>
            <Button
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="submit"
              variant="red"
            >
              Sign up
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="font-medium text-red-600 hover:text-red-500"
              href="/signin"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
