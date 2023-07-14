"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const submitSearch = (e) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/admin/staff?q=${encodedSearchQuery}`);
  };
  return (
    <>
      <form onSubmit={submitSearch}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Cari user..."
          className="bg-zinc-200 rounded-full px-4 py-2"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
    </>
  );
}
