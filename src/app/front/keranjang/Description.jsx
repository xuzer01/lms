"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Description({ carts }) {
  const [duration, setDuration] = useState(3);
  const [dueDate, setDueDate] = useState(new Date());
  const router = useRouter();

  const doLendingTransaction = async () => {
    const token = getCookie("token");
    const parsedDuration = parseInt(duration);
    const t = toast.loading("Loading...");
    const res = await fetch(process.env.API_URL + "/lending/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        duration: parsedDuration,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error("Transaksi Gagal dilakukan");
    } else {
      toast.update(t, {
        render: "Transaksi berhasil",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      router.push("/front/");
    }
  };

  const confirmationButtonHandler = () => {
    Swal.fire({
      title: "Konfirmasi",
      html: "Apakah anda yakin ingin melakukan peminjaman?",
      showDenyButton: true,
      denyButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((res) => {
      if (res.isConfirmed) {
        doLendingTransaction();
      }
    });
  };

  useEffect(() => {
    const now = new Date();

    const newDate = now.setDate(new Date().getDate() + parseInt(duration));
    setDueDate(new Date(newDate));
  }, [duration]);
  return (
    <>
      <div className="border bg-white shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-1">
            <h1>Total item</h1>
            <h1>Durasi</h1>
            <h1>Tanggal Pengembalian</h1>
          </div>

          <div className="flex flex-col space-y-1">
            <h1>{Object.keys(carts).length} Item</h1>
            <select
              className="bg-transparent"
              name="durasi"
              id="durasi"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="3">3 Hari</option>
              <option value="7">1 Minggu</option>
            </select>
            <h1>{dueDate.toLocaleDateString("en-IN")}</h1>
            <button
              onClick={confirmationButtonHandler}
              className="bg-blue-500 text-white font-bold rounded-md px-2 py-1"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
