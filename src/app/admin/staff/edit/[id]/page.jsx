"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }) {
  const [user, setUser] = useState({});
  const [libraries, setLibraries] = useState([]);
  const [userLibrary, setUserLibrary] = useState("");
  const token = getCookie("token");
  const router = useRouter();

  useEffect(() => {
    fetch(process.env.API_URL + `/user/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        setUserLibrary(data.data.libraryId);
      });
    fetch(process.env.API_URL + "/library")
      .then((res) => res.json())
      .then((data) => setLibraries(data.data));
  }, []);

  const onSubmit = async () => {
    if (userLibrary === "") {
      toast("Perpustakan wajib dipilih");
      return;
    }

    const t = toast.loading("Loading...");

    const response = await fetch(process.env.API_URL + "/role/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        user_id: user.id,
        library_id: userLibrary,
      }),
    });
    if (response.ok) {
      toast.update(t, {
        render: "Data berhasil diubah",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      router.push("/admin/staff");
    } else {
      toast.update(t, {
        render: "Data gagal diubah",
        type: "error",
        isLoading: false,
      });
    }
  };
  return (
    <div className="flex flex-wrap justify-center">
      <div className="rounded shadow border p-4 w-1/3">
        <div>
          <h1 className="uppercase font-bold text-xl mb-10">
            Edit Staff Perpustakaan
          </h1>

          <div className="mt-10 w-1/2 flex flex-col">
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col">
                <label htmlFor="name">Nama</label>
                <input
                  id="name"
                  className="border rounded bg-slate-300 px-2"
                  type="text"
                  readOnly
                  value={user.name}
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  className="border rounded bg-slate-300 px-2"
                  type="text"
                  readOnly
                  value={user.name}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col">
                <label htmlFor="name">Gender</label>
                <input
                  id="name"
                  className="border rounded bg-slate-300 px-2"
                  type="text"
                  readOnly
                  value={user.gender}
                />
              </div>
              <div>
                <label htmlFor="username">Phone</label>
                <input
                  className="border rounded bg-slate-300 px-2"
                  type="text"
                  readOnly
                  value={user.phone}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4 w-full">
              <div className="flex flex-col">
                <label htmlFor="name">Alamat</label>
                <input
                  id="address"
                  className="border rounded bg-slate-300 px-2"
                  type="text"
                  readOnly
                  value={user.address}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name">Role</label>
                <select
                  className="border rounded bg-slate-300 px-5 py-[2px]"
                  name="role"
                  id="role"
                  value={userLibrary}
                  onChange={(e) => setUserLibrary(e.target.value)}
                >
                  <option value="">Pilih</option>
                  {libraries.map((library) => {
                    return (
                      <option key={library.id} value={library.id}>
                        {library.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="mt-5 bg-blue-500 uppercase text-white font-bold w-full py-1 rounded-full"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
