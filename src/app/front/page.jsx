import Image from "next/image";
export default function HomePage() {
  return (
    <>
      <div className="bg-slate-600  w-screen m-auto text-center p-64 items-center text-white bg-[url('/img3.jpg')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-4xl font-bold">Welcome to</h1>
        <h1 className="text-4xl font-bold">MaNan Pus</h1>
        <h2>
          When it comes to searching for books, there is only one place to turn
          to – MaNan Pus.
        </h2>
        <button className="uppercase bg-red-600 px-4 py-2 mt-4 hover:bg-black transition">
          search new
        </button>
      </div>
      <section></section>
    </>
  );
}
