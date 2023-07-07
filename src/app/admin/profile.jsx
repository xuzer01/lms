"use client";

import { useEffect, useState } from "react";
import { getuserData } from "../lib/authentication";

export default function ProfileButton() {
  const [user, setUser] = useState({});
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    getuserData(localStorage.getItem("token")).then((user) => {
      setUser(user.data);
    });
  }, []);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
        {user ? user.name : "John Doe"}{" "}
      </div>
      <ul className={`${isOpen ? "block" : "hidden"} relative`}>
        <li>Akun</li>
        <li>Logout</li>
      </ul>
    </>
  );
}
