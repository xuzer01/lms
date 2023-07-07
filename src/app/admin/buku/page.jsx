import { getuserData } from "@/app/lib/authentication";
import { cookies } from "next/headers";
import BukuTable from "./bukuTable";

export default async function BukuPage({ searchParams }) {
  const nextCookies = cookies();
  const token = nextCookies.get("token");
  const { add, edit } = searchParams;
  const user = await getuserData(token.value);

  const getBooks = async () => {
    const res = await fetch(
      process.env.API_URL + `/library/${user.libraryId}/books`,
      {
        cache: "no-store",
        headers: {
          Authorization: `${token.value}`,
        },
      }
    );
    if (res.ok) {
      return await res.json();
    }
  };

  //   const user = await getuserData(token.value);
  const books = await getBooks();

  return (
    <>
      <div className="rounded shadow border p-4">
        <h1 className="uppercase font-bold text-xl">Buku</h1>
        <div className="mt-5">
          <BukuTable books={books.data} token={token.value} />
        </div>
      </div>
    </>
  );
}
