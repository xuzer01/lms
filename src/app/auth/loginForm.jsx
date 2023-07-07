"use client";

import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getuserData } from "../lib/authentication";

export default function LoginForm() {
  const router = useRouter();
  const [isError, setError] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const response = await fetch(process.env.API_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      const user = await getuserData(data.data.token);

      setCookie("token", data.data.token);

      if (user.data.role.name === "User") {
        router.replace("/");
      } else {
        router.replace("/admin");
      }
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg border p-4">
          {isError ? (
            <div className="mb-6 text-red-600 text-center">
              Username atau password salah
            </div>
          ) : null}
          <form onSubmit={submitForm}>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                min={5}
                className="border shadow-md px-2"
              />
            </div>
            <button className="mt-4 uppercase text-sm bg-blue-500 rounded-md text-white py-1 mx-auto w-full">
              Login
            </button>
          </form>
          <div className="text-sm text-center mt-6">
            Belum punya akun?{" "}
            <Link className="text-blue-500" href="/auth/register">
              Daftar disini
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
