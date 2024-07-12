import { handlers } from "@/lib/auth" // Referring to the auth.ts we just created
import {auth} from "../../../../lib/auth"
import {redirect} from "next/navigation"
export const { GET, POST } = handlers



