import FrontSearchBar from "./searchBar";

export default function Page() {
  let books;
  const getBooks = async () => {
    const response = await fetch(process.env.API_URL + "book");
    books = await response.json();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <FrontSearchBar />
      </div>
    </>
  );
}
