"use client";
import Link from "next/link";
import { IconButton } from "@/app/lib/IconButton";
import { EditIcon } from "@/app/lib/EditIcon";
export default function BookEditButton({ id }) {
  return (
    <>
      <Link href={`./buku/edit/${id}`}>
        <IconButton>
          <EditIcon size={20} fill="#979797" />
        </IconButton>
      </Link>
    </>
  );
}
