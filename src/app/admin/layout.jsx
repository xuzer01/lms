import Link from "next/link";
import ProfileButton from "./profile";
import { getuserData } from "../lib/authentication";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }) {
  const token = cookies().get("token");

  let user;

  const getData = async () => {
    const userData = await getuserData(token.value);
    user = userData.data;
  };

  await getData();
  return (
    <>
      <div className="fixed top-0 left-0 p-12 h-screen bg-blue-500 text-white z-40">
        <h1 className="text-center font-bold mt-10 text-2xl">Admin Panel</h1>

        <ul className="mt-10 font-medium w-full">
          <Link href={"/admin/"}>
            <li className="p-5 hover:bg-slate-700 transition-all">Dashboard</li>
          </Link>
          {user.role.name === "Admin" ? (
            <>
              <Link href={"/admin/perpustakaan"}>
                <li className="p-5 hover:bg-slate-700 transition-all">
                  Perpustakaan
                </li>
              </Link>

              <Link href={"/admin/staff"}>
                <li className="p-5 hover:bg-slate-700 transition-all">Staff</li>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/admin/buku"}>
                <li className="p-5 hover:bg-slate-700 transition-all">Buku</li>
              </Link>
              <Link href={"/admin/peminjaman"}>
                <li className="p-5 hover:bg-slate-700 transition-all">
                  Peminjaman
                </li>
              </Link>
              <Link href={"/admin/pengembalian"}>
                <li className="p-5 hover:bg-slate-700 transition-all">
                  Pengembalian
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="flex justify-end p-4 sh adow-md">
        <ProfileButton user={user} />
      </div>
      <div className="ml-64 mt-10 mr-5">{children}</div>
    </>
  );
}
