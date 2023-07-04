"use client";

import { redirect, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const apiUrl = process.env.API_URL;
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [error, setError] = useState("");

  const validateForm = () => {
    if (name === "") {
      setError("Nama tidak boleh kosong");
      return false;
    }
    if (username === "") {
      setError("Username tidak boleh kosong");
      return false;
    }
    if (password === "") {
      setError("Password tidak boleh kosong");
      return false;
    }
    if (password !== rePassword) {
      setError("Passwords tidak sama");
      return false;
    }
    return true;
  };

  const register = async () => {
    const response = await fetch(apiUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });
    if (response.ok) {
      return true;
    } else {
      setError("Username sudah digunakan");
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    //Valdiating form
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      return;
    }
    if (await register()) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun berhasil ditambahkan",
        confirmButtonText: "Oke",
      });
      router.push("/auth");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg border p-4">
          <form onSubmit={submitForm}>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="nama">Nama</label>
              <input
                value={name}
                onChange={(value) => setName(value.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Nama"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(value) => setUsername(value.target.value)}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(value) => setPassword(value.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Ulangi password</label>
              <input
                value={rePassword}
                onChange={(value) => setRePassword(value.target.value)}
                type="password"
                id="re-password"
                name="re-password"
                placeholder="Ulangi password"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <button className="mt-4 uppercase text-sm bg-blue-500 rounded-md text-white py-1 mx-auto w-full">
              Daftar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
