"use client";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function CartItem({ cart }) {
  const router = useRouter();
  const deleteCart = async () => {
    const token = getCookie("token");
    const t = toast.loading("Loading...");
    const res = await fetch(process.env.API_URL + `/cart/${cart.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.ok) {
      toast.update(t, {
        render: "Berhasil dihapus",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      router.refresh();
    } else {
      toast.update(t, {
        render: "Data gagal dihapus",
        type: "error",
        isLoading: false,
        autoClose: true,
      });
    }
  };
  const deleteButtonHandler = () => {
    Swal.fire({
      title: "Konfirmasi",
      html: "Apakah anda yakin ingin menghapus item ini dari keranjang?",
      showDenyButton: true,
      denyButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteCart();
      }
    });
  };
  return (
    <div className="border shadow-lg">
      <div className="flex space-x-4 p-4">
        <Image
          src={"/images/books/download (1).jpeg"}
          width={100}
          height={50}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{cart.library_book.book.title}</h1>
          <h2>{cart.library_book.library.name}</h2>
          <h2>Alamat Pengambilan: {cart.library_book.library.location}</h2>
        </div>
        <div className="self-end flex">
          <MdDelete
            className="cursor-pointer"
            onClick={deleteButtonHandler}
            color="red"
          />
        </div>
      </div>
    </div>
  );
}
