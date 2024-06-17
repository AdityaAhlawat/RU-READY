import { SignIn }  from "@/components/signin";
import {auth} from "../../lib/auth"
import {redirect} from "next/navigation"


export default async function signin() {
  const session = await auth();
    if(session){
      redirect("/intro")
    }
  return (
    <SignIn></SignIn>
  );
}
