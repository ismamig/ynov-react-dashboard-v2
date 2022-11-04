import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const Routes = [
  {
    "title": "Dashboard",
    "href": "/"
  },
  {
    "title": "Map",
    "href": "/map"
  },
  // {
  //   "title": "Admin",
  //   "href": "/admin/users"
  // }
]

export default function Layout({ children }) {

  const { data: session } = useSession()

  const router = useRouter()

  return (
    <div className="flex">
      <Sidebar router={router} Routes={Routes} session={session}/>
      <main className="w-full">
        <Navbar route={ router.asPath } Routes={Routes} session={session} />
        <div className="w-full">{children}</div>
      </main>
    </div>
  )
}