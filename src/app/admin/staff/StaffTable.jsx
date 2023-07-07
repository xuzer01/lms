"use client";
import { Table } from "@nextui-org/react";
import { IconButton } from "@/app/lib/IconButton";
import { EditIcon } from "@/app/lib/EditIcon";
import { DeleteIcon } from "@/app/lib/DeleteIcon";
import Link from "next/link";

export default function StaffTable({ staffs }) {
  return (
    <>
      <h1 className="uppercase font-bold text-xl mb-10">
        List Staff Perpustakaan
      </h1>
      <Link
        className="mb-4 px-4 py-2 bg-blue-500 text-white shadow-lg font-medium"
        href={{
          pathname: "",
          query: {
            add: true,
          },
        }}
      >
        Daftarkan Staff
      </Link>
      <div className="mt-4">
        <Table
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>No</Table.Column>
            <Table.Column>Nama</Table.Column>
            <Table.Column>Perpustakaan</Table.Column>
            <Table.Column>Aksi</Table.Column>
          </Table.Header>
          <Table.Body>
            {staffs.map((staff, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{staff.name}</Table.Cell>
                  <Table.Cell>{staff.library.name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Link href={`./staff/edit/${staff.id}`}>
                        <IconButton>
                          <EditIcon size={20} fill="#979797" />
                        </IconButton>
                      </Link>

                      <IconButton
                        onClick={() => onDeleteButtonClicked(staff.id)}
                      >
                        <DeleteIcon size={20} fill={"#FF0080"} />
                      </IconButton>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
