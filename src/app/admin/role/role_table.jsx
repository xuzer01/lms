"use client";

import { DeleteIcon } from "@/app/lib/DeleteIcon";
import { EditIcon } from "@/app/lib/EditIcon";
import { IconButton } from "@/app/lib/IconButton";
import { Table, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RoleTable({ roles }) {
  const router = useRouter();
  const deleteRole = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(process.env.API_URL + "/role/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Role berhasil dihapus",
        showConfirmButton: true,
        timer: 1500,
      }).then((result) => {
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Role gagal dihapus",
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
        deleteRole(id);
      }
    });
  };
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Column>NO</Table.Column>
          <Table.Column>NAMA</Table.Column>
          <Table.Column>AKSI</Table.Column>
        </Table.Header>
        <Table.Body>
          {roles.map((role, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{role.name}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Link href={`./role/edit/${role.id}`}>
                      <IconButton>
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Link>

                    <IconButton onClick={() => onDeleteButtonClicked(role.id)}>
                      <DeleteIcon size={20} fill={"#FF0080"} />
                    </IconButton>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
