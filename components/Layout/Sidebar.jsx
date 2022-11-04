import Link from "next/link";
import AddCard from "../Map/AddCard";

function NavItem({ route, active }) {
  if (active) {
    return (
      <Link href={route.href}>
        <li className="text-cyan-600 p-3 bg-slate-200 border-r-4 border-cyan-600 hover:bg-slate-200 hover:cursor-pointer transition-all">
          <a>{route.title}</a>
        </li>
      </Link>
    );
  }
  return (
    <Link href={route.href}>
      <li className="p-3 hover:bg-slate-200 hover:cursor-pointer transition-all">
        <a>{route.title}</a>
      </li>
    </Link>
  );
}

export default function Sidebar({ router, Routes, session }) {
  return (
    <>
      <div className="flex flex-col w-80 bg-white">
        <div className="border-b-2">
          <h2 className="text-3xl text-center py-10">My Dashboard</h2>
        </div>
        <ul>
          {Routes.map((route) => (
            <NavItem
              key={route.title}
              route={route}
              active={router.asPath === route.href}
            />
          ))}
        </ul>
      </div>
    </>
  );
}


