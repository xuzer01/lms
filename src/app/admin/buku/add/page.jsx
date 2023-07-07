import AddBukuForm from "./addBookForm";

import { cookies } from "next/headers";

export default async function AddBookPage() {
  const token = cookies().get("token");
  //   const user = await getuserData(token.value);

  //   const getStaffLibrary = async () => {
  //     const libraryId = user.data.library.id;
  //     const response = await fetch(
  //       process.env.API_URL + "/library/" + libraryId,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       return await response.json();
  //     }
  //   };

  //   const libraries = await getStaffLibrary();

  return (
    <>
      <AddBukuForm token={token} />
    </>
  );
}
