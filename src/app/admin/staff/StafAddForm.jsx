"use client";

import { useEffect, useState } from "react";

export default async function StaffAddForm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(process.env.API_URL + "/user?is_user=1");
      const data = await res.json();
      return data.data;
    };
    setUsers(getUser());
  }, []);

  return (
    <>
      <h1 className="uppercase font-bold text-xl mb-10">Pendaftaran Staff</h1>

      {users.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </>
  );
}
