"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function FrontBookList({ books }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    fetch(process.env.API_URL + "/book", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        books = data.data;
      });
  }, query);
  if (books.length > 0) {
    return (
      <div className="mt-10 flex flex-wrap space-x-20">
        {books.map((book) => {
          return (
            <Link key={book.id} href={`/front/buku/${book.id}`}>
              <div className="relative z-0">
                <Image
                  src={"/images/books/download (1).jpeg"}
                  width={300}
                  height={100}
                />
                <div className="bg-red-500 flex justify-center items-center text-white font-medium p-3">
                  <h2>{book.title}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center mt-10">
        Buku tidak tersedia
      </div>
    );
  }
}
