import Image from "next/image";
export default function FrontBookList({ books }) {
  return (
    <div className="mt-10 flex flex-wrap space-x-20">
      {books.map((book) => {
        return (
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
        );
      })}
    </div>
  );
}
