"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddBukuForm({ token }) {
  const [title, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [release_date, setReleaseDate] = useState(Date.now());

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.API_URL + "/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
      body: JSON.stringify({
        title,
        author,
        publisher,
        synopsis,
        release_date,
      }),
    });
    if (response.ok) {
      Swal.fire("Success", "Data berhasil ditambahkan", "success").then(() =>
        router.push("/admin/buku")
      );
    } else {
      Swal.fire("Error", "Data Gagal Ditambahkan", "error");
    }
  };

  return (
    <div className="rounded shadow border p-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="uppercase text-xl font-bold">Tambah Buku</h1>

        <div className="mt-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-medium text-sm">
                Nama Buku
              </label>
              <input
                type="text"
                id="Name"
                value={title}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Name" className="text-sm font-medium">
                Author
              </label>
              <input
                type="text"
                id="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="Name" className="text-sm font-medium">
                Publisher
              </label>
              <input
                type="text"
                id="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="Name" className="text-sm font-medium">
                Tanggal Rilis
              </label>
              <input
                type="date"
                id="release_date"
                value={release_date}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium" htmlFor="synopsis">
                Synopsis
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setSynopsis(e.target.value)}
              >
                {synopsis}
              </textarea>
            </div>
            {/* <div>
              <label
                className="block mb-2 text-sm font-medium"
                for="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                id="image"
                type="file"
              />
            </div> */}
            <input
              type="submit"
              value="Tambah"
              className="bg-blue-500 py-2 px-4 text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
