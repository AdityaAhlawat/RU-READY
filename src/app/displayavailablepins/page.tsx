import { DisplayAvailablePings } from "@/components/display-available-pings";
import {auth} from "../../lib/auth"
import {redirect} from "next/navigation"


export default async function displayavailablepings() {
    const session = await auth();
    if(!session){
      redirect("/")
    }
    return (
      <DisplayAvailablePings></DisplayAvailablePings>
    );
  }