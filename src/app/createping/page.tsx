import { CreatePing } from "@/components/create-ping";
import {auth} from "../../lib/auth"
import {redirect} from "next/navigation"

export default async function createping() {
    const session = await auth();
    if(!session){
      redirect("/")
    }
    return (
        <CreatePing></CreatePing>
    );
  }