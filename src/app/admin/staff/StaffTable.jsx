"use client";
import { Table } from "@nextui-org/react";
import { IconButton } from "@/app/lib/IconButton";
import { EditIcon } from "@/app/lib/EditIcon";
import { DeleteIcon } from "@/app/lib/DeleteIcon";
import Link from "next/link";
import StaffSearchBar from "./searchBarComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StaffSkeletonCard from "./SkeletonCard";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";

export default function StaffTable() {
  const token = getCookie("token");

  const searchParam = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParam ? searchParam.get("q") : "";

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    fetch(process.env.API_URL + `/user?is_staff=1`)
      .then((res) => res.json())
      .then((data) => {
        setStaffs(data.data);
        setLoading(false);
      });
  }, [toggle]);

  const deleteStaff = async (user_id) => {
    Swal.fire({
      title: "Konfirmasi",
      html: "Apakah anda yakin ingin menghapus staff ini?",
      icon: "question",
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
      showDenyButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const response = await fetch(process.env.API_URL + "/role/release", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            user_id,
          }),
        });
        if (response.ok) {
          Swal.fire("Success", "Data berhasil dihapus").then(() =>
            setToggle(!toggle)
          );
        } else {
          Swal.fire("Failed", "Staff gagal dihapus", "error");
        }
      }
    });
  };

  return (
    <>
      <h1 className="uppercase font-bold text-xl mb-10">
        List Staff Perpustakaan
      </h1>
      <div className="flex flex-row justify-between items-center">
        <Link
          className="mb-4 px-4 py-2 bg-blue-500 text-white shadow-lg font-medium"
          href={"/admin/staff/add"}
        >
          Daftarkan Staff
        </Link>
        <StaffSearchBar />
      </div>
      <div className="mt-4">
        {loading ? (
          <StaffSkeletonCard />
        ) : staffs.length > 0 ? (
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
                  <Table.Row key={staff.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{staff.name}</Table.Cell>
                    <Table.Cell>{staff.library.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <IconButton onClick={() => deleteStaff(staff.id)}>
                          <DeleteIcon size={20} fill={"#FF0080"} />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            router.push(`/admin/staff/edit/${staff.id}`)
                          }
                        >
                          <EditIcon size={20} fill="#979797" />
                        </IconButton>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex w-full justify-center">Data Tidak Tersedia</div>
        )}
      </div>
    </>
  );
}
