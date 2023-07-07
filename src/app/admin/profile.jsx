"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileButton({ user }) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    deleteCookie("token");
    router.replace("/auth");
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className="cursor-pointer font-bold"
          onClick={() => setOpen(!isOpen)}
        >
          {user ? user.name : "John Doe"}{" "}
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } absolute mt-7 bg-slate-100`}
        >
          <li
            className="cursor-pointer text-sm font-medium hover:bg-white hover:text-blue-500 transition"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}
