"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddRoleForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const res = await fetch(process.env.API_URL + "/role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (res.ok) {
      console.log(await res.json());
      await Swal.fire("Berhasil", "Data telah ditambahkan", "success");
      router.push("./");
    } else {
      Swal.fire("Gagal", "Data gagal ditambahkan", "error");
      setName("");
    }
  };

  return (
    <>
      <div className="rounded shadow border p-4 flex flex-col justify-center items-center">
        <h1>Tambah Role</h1>
        <div className="mt-10">
          <form onSubmit={submitForm}>
            <div>
              <label htmlFor="name">Nama</label>
              <input
                id="name"
                name="name"
                className="ml-5 border"
                placeholder="Nama Role"
                type="text"
                value={name}
                onChange={(value) => setName(value.target.value)}
              />
            </div>
            <input
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md text-sm"
              type="submit"
              value={"Tambah"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
