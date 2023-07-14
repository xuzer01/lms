"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function PerpustakaanForm() {
  const token = getCookie("token");
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState();
  const [status, setStatus] = useState(1);

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.API_URL + "/library/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name,
        location,
        status,
      }),
    });

    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Perpustakaan berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then(() => {
        router.push("/admin/perpustakaan");
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Perpustakaan gagal ditambahkan",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className="rounded shadow border p-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Tambah Perpustakaan</h1>
        <div className="mt-10 ">
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="flex flex-col">
              <label htmlFor="name">Nama: </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lokasi">Lokasi: </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                type="text"
                id="lokasi"
                name="lokasi"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status: </label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">Aktif</option>
                <option value="0">Tidak aktif</option>
              </select>
            </div>
            <input
              className="py-1 flex w-full justify-center text-white bg-blue-500 rounded-full cursor-pointer"
              type="submit"
              value="Tambah"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
