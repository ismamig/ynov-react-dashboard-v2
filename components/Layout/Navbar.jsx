import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Navbar({ route, Routes, session }) {


  let routeName = ""
  Routes.map((elem) => {
    if (elem.href === route) {
      routeName = elem.title
    }
  })
  return (
    <div className="flex justify-between items-center py-4 px-4">
      <div>
        <h2 className="text-2xl">{routeName}</h2>
      </div>
      {session && (
        <div className="flex items-center">
          {session?.user?.role === "ROLE_ADMIN" && (
            <Link href="/admin/users">
              <a
                className=" text-red-500 mr-5 hover:underline hover:cursor-pointer"
                route="/admin/users"
              >
                Admin
              </a>
            </Link>
          )}
          <h2 className="mr-10 rounded-md bg-red-100 p-2">
            {session.user.role}
          </h2>
          <h2 className="mr-10">Hi, {session.user.email}</h2>
          <button
            onClick={() => signOut()}
            className="px-3 py-2 bg-red-400 rounded-xl text-white"
          >
            Log out
          </button>
        </div>
      )}
      {!session && (
        <div className="flex items-center">
          <h2 className="mr-10">Not signed in</h2>
          <button
            onClick={() => signIn("google")}
            className="px-3 py-2 bg-blue-400 rounded-xl text-white"
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}