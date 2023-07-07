"use client";
import { IconButton } from "@/app/lib/IconButton";
import { DeleteIcon } from "@/app/lib/DeleteIcon";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export default function BookDeleteButton({ token, bookId }) {
  const router = useRouter();
  const deleteBook = () => {
    Swal.fire({
      title: "Konfirmasi",
      html: "Apakah anda yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      console.log("confirmed");
      if (result.isConfirmed) {
        const response = await fetch(process.env.API_URL + "/book/" + bookId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response.ok) {
          Swal.fire({
            title: "Berhasil",
            html: "Buku berhasil dihapus",
            icon: "success",
          }).then(() => {
            router.refresh();
          });
        } else {
          Swal.fire({
            title: "Gagal",
            html: "Buku gagal dihapus",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <IconButton onClick={deleteBook}>
        <DeleteIcon size={20} fill={"#FF0080"} />
      </IconButton>
    </>
  );
}
