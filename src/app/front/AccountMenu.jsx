"use client";

import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { toast } from "react-toastify";

export default function AccountMenu() {
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setToken(getCookie("token"));
    if (token) {
      fetch(process.env.API_URL + "/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.data));
    }
  }, [token]);

  const logout = () => {
    deleteCookie("token");
    setToken(null);
    setUser({});
    toast("Anda telah logout", { type: "success" });
    router.push("/auth");
  };

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <div>
          <p
            href={"/front/akun"}
            className="flex items-center cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {user.name} <AiOutlineCaretDown size={10} />
          </p>
          <div
            className={`${show ? "block" : "hidden"} absolute bg-black py-1`}
          >
            <ul>
              <li
                onClick={logout}
                className="px-4 py-4 hover:bg-white hover:text-black cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link href={"/auth"}>Akun</Link>
      )}
    </>
  );
}
