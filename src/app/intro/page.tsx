import { DashboardIntro } from "@/components/dashboard-intro";
import {auth} from "../../lib/auth"
import {redirect} from "next/navigation"

export default async function userintro() {
    const session = await auth();
    if(!session){
      redirect("/")
    }
    return (
      <DashboardIntro></DashboardIntro>  
    );
  }