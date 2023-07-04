import Link from "next/link";
import ProfileButton from "./profile";
import { getuserData } from "../lib/authentication";

export default async function AdminLayout({ children }) {
  return (
    <>
      <div className="fixed top-0 left-0 p-12 h-screen bg-blue-500 text-white z-40">
        <h1 className="text-center font-bold mt-10 text-2xl">Admin Panel</h1>

        <ul className="mt-10 font-medium w-full">
          <Link href={"/admin/"}>
            <li className="p-5 hover:bg-slate-700 transition-all">Dashboard</li>
          </Link>
          <Link href={"/admin/role"}>
            <li className="p-5 hover:bg-slate-700 transition-all">Role</li>
          </Link>
          <Link href={"/admin/perpustakaan"}>
            <li className="p-5 hover:bg-slate-700 transition-all">
              Perpustakaan
            </li>
          </Link>
          <Link href={"/admin/staff"}>
            <li className="p-5 hover:bg-slate-700 transition-all">Staff</li>
          </Link>
        </ul>
      </div>
      <div className="flex justify-end p-4 shadow-md">
        <ProfileButton />
      </div>
      <div className="ml-64 mt-10 mr-5">{children}</div>
    </>
  );
}
