"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ setuserid }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (search !== "") {
      const encodedQuery = encodeURI(search);
      fetch(process.env.API_URL + `/user?is_user=true&q=${encodedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
        });
      setShow(true);
    } else {
      setUsers([]);
    }
  }, [search]);

  const userClickHandler = (user) => {
    setSearch(user.name);
    setUsers([]);
    setuserid(user.id);
    setShow(false);
  };

  return (
    <>
      <form>
        <input
          className="border px-2 rounded-full bg-gray-100 w-full"
          type="text"
          placeholder="Cari user.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isShow
          ? users.length > 0
            ? users.map((user, index) => {
                return (
                  <div className="block border border-t-0" key={user.id}>
                    <div className="cursor-pointer px-4 py-1 hover:text-blue-500">
                      <p onClick={() => userClickHandler(user)}>{user.name}</p>
                    </div>
                  </div>
                );
              })
            : null
          : null}
      </form>
    </>
  );
}
