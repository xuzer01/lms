"use client";

import { redirect, useRouter } from "next/navigation";

import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const apiUrl = process.env.API_URL;
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("L");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(false);

  const validateForm = () => {
    setError(false);
    if (name === "") {
      toast("Nama tidak boleh kosong");
      setError(true);
    }
    if (username === "") {
      toast("username tidak boleh kosong");
      setError(true);
    }
    if (password === "") {
      toast("password tidak boleh kosong");
      setError(true);
    }
    if (password !== rePassword) {
      toast("Password tidak sama");
      setError(true);
    }
    if (address === "") {
      toast("Alamat tidak boleh kosong");
      setError(true);
    }
    if (phone === "") {
      toast("No HP tidak boleh kosong");
      setError(true);
    }
    if (!error) {
      return true;
    } else {
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    //Valdiating form
    if (validateForm()) {
      const response = await fetch(apiUrl + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          gender,
          phone,
          address,
        }),
      });
      if (response.ok) {
        Swal.fire("Berhasil", "Pendaftaran berhasil", "success").then(() =>
          router.push("/auth")
        );
      } else {
        const data = await response.json();
        const errors = data.errors;
        errors.map((error) => toast(error.msg));
      }
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
            <div className="flex flex-col gap-2 mb-5">
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
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="password">Alamat</label>
              <input
                value={address}
                onChange={(value) => setAddress(value.target.value)}
                type="text"
                id="address"
                name="address"
                placeholder="Alamat"
                required
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="password">Gender</label>
              <select
                className="bg-white"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="L">Laki - Laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="password">No Hp</label>
              <input
                value={phone}
                onChange={(event) => {
                  const result = event.target.value.replace(/\D/g, "");
                  setPhone(result);
                }}
                type="text"
                id="phone"
                name="phone"
                placeholder="No Hp"
                required
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
