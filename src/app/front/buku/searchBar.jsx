"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function FrontSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/front/buku?q=${encodeURI(searchQuery)}`);
  };
  return (
    <>
      <div className="flex items-center space-x-2">
        <form className="flex items-center space-x-2">
          <input
            type="search"
            className="border shadow-sm py-1 px-2"
            placeholder="Cari Buku..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <AiOutlineSearch
              onClick={handleSearch}
              className="cursor-pointer"
              size={20}
            />
          </div>
        </form>
      </div>
    </>
  );
}
