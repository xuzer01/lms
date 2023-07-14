"use client";
import { Table } from "@nextui-org/react";

export default function PengembalianTable({ returnedBooks }) {
  return (
    <Table>
      <Table.Header>
        <Table.Column>No</Table.Column>
        <Table.Column>Nama Peminjam</Table.Column>
        <Table.Column>Nama Buku</Table.Column>
        <Table.Column>Tanggal Peminjaman</Table.Column>
        <Table.Column>Tanggal Pengembalian</Table.Column>
        <Table.Column>Tanggal Dikembalikan</Table.Column>
      </Table.Header>
      <Table.Body>
        {returnedBooks.map((book, index) => {
          return (
            <Table.Row key={book.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{book.lending.user.name}</Table.Cell>
              <Table.Cell>{book.library_book.book.title}</Table.Cell>
              <Table.Cell>
                {new Date(book.lending.lending_date).toLocaleDateString(
                  "en-IN"
                )}
              </Table.Cell>
              <Table.Cell>
                {new Date(book.lending.due_date).toLocaleDateString("en-IN")}
              </Table.Cell>
              <Table.Cell>
                {new Date(book.returned_date).toLocaleDateString("en-IN")}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
