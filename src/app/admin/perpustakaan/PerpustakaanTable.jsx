"use client";
import { IconButton } from "@/app/lib/IconButton";
import { Table } from "@nextui-org/react";
import { EditIcon } from "@/app/lib/EditIcon";
import { DeleteIcon } from "@/app/lib/DeleteIcon";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function PerpustakaanTable({ perpustakaan }) {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const deleteLibary = async (id) => {
    const response = await fetch(process.env.API_URL + "/library/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Perpustakaan berhasil dihapus",
        showConfirmButton: true,
        timer: 1500,
      }).then((result) => {
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Perpustakaan gagal dihapus",
        showConfirmButton: true,
      }).then((result) => {
        router.refresh();
      });
    }
  };
  const onDeleteButtonClicked = (id) => {
    Swal.fire({
      title: "Hapus?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLibary(id);
      }
    });
  };

  return (
    <Table
      aria-label="List perpustakaan"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>No</Table.Column>
        <Table.Column>Nama</Table.Column>
        <Table.Column>Lokasi</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Aksi</Table.Column>
      </Table.Header>
      <Table.Body>
        {perpustakaan.map((perpus, index) => {
          return (
            <Table.Row key={perpus.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{perpus.name}</Table.Cell>
              <Table.Cell>{perpus.location}</Table.Cell>
              <Table.Cell>
                {perpus.isActive ? "Aktif" : "Tidak Aktif"}
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-row">
                  <IconButton onClick={() => onDeleteButtonClicked(perpus.id)}>
                    <DeleteIcon size={20} fill={"#FF0080"} />
                  </IconButton>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
