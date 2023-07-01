"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FrontLayout({ children }) {
  const menus = [
    { name: "Akun", path: "/auth" },
    { name: "Perpustakaan", path: "/front/perpustakaan" },
  ];
  let [selectedIndex, setSelectedIndex] = useState(0);
  const navbarMenu = [
    { name: "Home", path: "/front" },
    { name: "Layanan", path: "/front/service" },
  ];
  return (
    <>
      <div className="flex justify-end bg-black text-white">
        {menus.map((menu) => {
          return (
            <div className="m-4 uppercase font-medium text-sm">
              <Link href={menu.path}>{menu.name}</Link>
            </div>
          );
        })}
      </div>
      <div className="flex justify-evenly m-8">
        <Image src={"vercel.svg"} width={125} height={125} />
        <div>
          <ul className="flex gap-4 font-medium">
            {navbarMenu.map((menu, index) => {
              return (
                <li>
                  <Link
                    className={`${
                      selectedIndex === index ? "text-red-600" : "text-black"
                    }  hover:text-red-600 transition-all duration-300 `}
                    href={menu.path}
                    onClick={(e) => setSelectedIndex(index)}
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
