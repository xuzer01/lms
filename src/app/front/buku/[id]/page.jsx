import Image from "next/image";
import Library from "./Library";

async function getBook(book_id) {
  const res = await fetch(process.env.API_URL + `/book/${book_id}`);
  let data = {};
  if (!res.ok) {
    throw new Error("Gagal memuat data");
  } else {
    data = await res.json();
  }
  return data.data;
}

export default async function Page({ params }) {
  const book = await getBook(params.id);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center space-x-12">
        <Image
          src={"/images/books/download (1).jpeg"}
          width={300}
          height={100}
        />
        <div className="flex flex-col w-1/5">
          <h1 className="font-bold text-xl">{book.title}</h1>
          <h2>Author: {book.author}</h2>
          <h2>Publisher: {book.publisher}</h2>
          <h2 className="mt-10 font-bold">Sinposis</h2>
          <p className="text-justify">{book.synopsis}</p>
        </div>
      </div>
      <div className="mt-10 w-1/3">
        <Library libraries={book.libraries} />
      </div>
    </div>
  );
}
