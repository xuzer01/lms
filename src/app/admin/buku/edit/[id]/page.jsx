import { cookies } from "next/headers";
import BookEditForm from "./BookEditForm";

export default function Page({ params: { id } }) {
  const token = cookies().get("token");
  return (
    <>
      <BookEditForm id={id} token={token.value} />
    </>
  );
}
