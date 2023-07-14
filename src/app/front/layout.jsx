"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

export default function FrontLayout({ children }) {
  let user = null;
  const menus = [{ name: "Akun", path: "/auth" }];
  let [selectedIndex, setSelectedIndex] = useState(0);
  const navbarMenu = [
    { name: "Home", path: "/front" },
    { name: "Buku", path: "/front/buku" },
    {
      name: "Keranjang",
      path: "/front/keranjang",
    },
  ];
  return (
    <>
      <div className="flex justify-end bg-black text-white">
        {/* {menus.map((menu) => {
          return (
            <div className="m-4 uppercase font-medium text-sm">
              <Link href={menu.path}>{menu.name}</Link>
            </div>
          );
        })} */}
        <div className="m-4 uppercase font-medium text-sm">
          {/* <Link href={"/auth"}>Akun</Link> */}
          <AccountMenu />
        </div>
      </div>
      <div className="flex justify-evenly m-8">
        <Image src={"/Logoo.jpg"} width={50} height={50} alt="Logo" />
        <div>
          <ul className="flex gap-4 font-medium">
            {navbarMenu.map((menu, index) => {
              return (
                <li key={index}>
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
