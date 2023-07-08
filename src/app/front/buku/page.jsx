import FrontBookList from "./BookList";
import FrontSearchBar from "./searchBar";

export default async function Page() {
  let books;
  const getBooks = async () => {
    const response = await fetch(process.env.API_URL + "/book");
    books = await response.json();
  };

  await getBooks();

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen">
        <FrontSearchBar />
        <FrontBookList books={books.data} />
      </div>
    </>
  );
}
