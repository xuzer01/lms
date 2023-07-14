"use client";

import { getCookie } from "cookies-next";
import LendingTable from "./LendingTable";
import { useEffect, useState } from "react";
import PeminjamanModal from "./PeminjamanModal";

export default function Page() {
  const [lendings, setLending] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = getCookie("token");
  useEffect(() => {
    fetch(process.env.API_URL + "/lending/library?active=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setLending(data.data);
      });
  }, []);
  return (
    <>
      <div className="border rounded p-4">
        <h1 className="uppercase font-bold">List Peminjaman perpustakaan</h1>
        <div className="mt-5">
          <LendingTable lendings={lendings} setShowModal={setShowModal} />
        </div>
      </div>
      {showModal ? <PeminjamanModal /> : null}
    </>
  );
}
