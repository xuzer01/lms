import { redirect } from "next/navigation";

const apiUrl = process.env.API_URL;

export async function getuserData(token) {
  if (verifyToken(token)) {
    const response = await fetch(apiUrl + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  }
}

export async function verifyToken(token) {
  const response = await fetch(apiUrl + "/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export async function isUserLoggedIn() {
  const token = localStorage.getItem("token") || null;
  if (token) {
    const isTokenValid = await verifyToken(token);
    if (isTokenValid) {
      return true;
    }
  }

  return false;
}
