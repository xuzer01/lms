import { useSearchParams } from "next/navigation";
import FrontBookList from "./BookList";
import FrontSearchBar from "./searchBar";

async function getData() {
  let data;
  const response = await fetch(process.env.API_URL + "/book", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Data buku gagal diambil");
  } else {
    data = await response.json();
    console.log(data);
  }

  return data.data;
}

export default async function Page() {
  const books = await getData();
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen">
        <FrontSearchBar />
        <FrontBookList books={books} />
      </div>
    </>
  );
}
