"use client";
import { Table } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

export default function LendingTable({ lendings, setShowModal }) {
  const token = getCookie("token");
  const router = useRouter();
  const returnBook = async (lending_id) => {
    const t = toast.loading("Loading...");
    const res = await fetch(process.env.API_URL + "/lending/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        lending_detail_id: lending_id,
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error("Gagal mengembalikan buku");
    } else {
      toast.update(t, {
        render: "Berhasil mengembalikan buku",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      router.push("/admin/pengembalian");
      router.refresh();
    }
  };
  const returnButtonHandler = (lending_id) => {
    Swal.fire({
      title: "Konfirmasi",
      html: "Pastikan buku telah dikembalikan dengan keadaan baik",
      showDenyButton: true,
      denyButtonText: "Tidak",
      confirmButtonText: "Ya",
    }).then((res) => {
      if (res.isConfirmed) {
        returnBook(lending_id);
      }
    });
  };
  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Column>No</Table.Column>
          <Table.Column>Nama Peminjam</Table.Column>
          <Table.Column>Nama Buku</Table.Column>
          <Table.Column>Tanggal Peminjaman</Table.Column>
          <Table.Column>Tanggal Pengembalian</Table.Column>
          <Table.Column>Aksi</Table.Column>
        </Table.Header>
        <Table.Body>
          {lendings.map((lending, index) => {
            return (
              <Table.Row key={lending.id}>
                <Table.Cell>{index + 1} </Table.Cell>
                <Table.Cell>{lending.lending.user.name} </Table.Cell>
                <Table.Cell>{lending.library_book.book.title} </Table.Cell>
                <Table.Cell>
                  {new Date(lending.lending.lending_date).toLocaleDateString(
                    "en-IN"
                  )}{" "}
                </Table.Cell>
                <Table.Cell>
                  <p
                    className={`${
                      new Date(lending.lending.due_date) < new Date()
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {new Date(lending.lending.due_date).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => returnButtonHandler(lending.id)}
                    className="bg-blue-500 px-2 text-white rounded-lg"
                  >
                    Kembalikan
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
