import { cookies } from "next/headers";
import PengembalianTable from "./PengembalianTable";

async function getRetunedBook() {
  const token = cookies().get("token");
  const res = await fetch(
    process.env.API_URL + "/lending/library?returned=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
    }
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Gagal memuat data");
  } else {
    const data = await res.json();
    return data.data;
  }
}
export default async function Page() {
  const returnedBooks = await getRetunedBook();
  return (
    <div className="rounded border p-4 shadow">
      <h1 className="uppercase font-bold">List Buku yang telah dikembalikan</h1>
      <PengembalianTable returnedBooks={returnedBooks} />
    </div>
  );
}
