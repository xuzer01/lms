"use client";
import { AiOutlineSearch } from "react-icons/ai";
export default function FrontSearchBar() {
  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="search"
          className="border shadow-sm py-1 px-2"
          placeholder="Cari Buku..."
        />
        <div>
          <AiOutlineSearch size={20} />
        </div>
      </div>
    </>
  );
}
