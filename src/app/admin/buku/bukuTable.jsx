"use client";
import { Table } from "@nextui-org/react";
import Link from "next/link";
import BookDeleteButton from "./deleteButton";
import BookEditButton from "./editButton";

export default function BukuTable({ books, token }) {
  return (
    <>
      <Link
        href={"./buku/add"}
        className="mb-5 text-white bg-blue-500 py-2 px-2 rounded-md shadow-md"
      >
        Tambah Buku
      </Link>
      <div className="mt-10">
        <Table>
          <Table.Header>
            <Table.Column>No</Table.Column>
            <Table.Column>Nama</Table.Column>
            <Table.Column>Author</Table.Column>
            <Table.Column>Publisher</Table.Column>
            <Table.Column>Tanggal Release</Table.Column>
            <Table.Column>Aksi</Table.Column>
          </Table.Header>
          <Table.Body>
            {books.map((book, index) => (
              <Table.Row key={book.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.publisher}</Table.Cell>
                <Table.Cell>{book.release_date}</Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <BookDeleteButton token={token} bookId={book.id} />
                    <BookEditButton id={book.id} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
