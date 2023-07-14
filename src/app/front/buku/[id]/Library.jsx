"use client";

import { useState } from "react";
import LibraryModal from "./LibraryModal";

export default function Library({ libraries }) {
  const [showModal, setShowModal] = useState(false);
  const [library, setLibrary] = useState({});
  return (
    <>
      <div>
        <h1 className="text-lg font-bold text-center">List Perpsutakaan</h1>
        <div className="flex flex-col mt-10">
          {libraries.map((library) => {
            return (
              <div
                key={library.id}
                onClick={() => {
                  setLibrary(library);
                  setShowModal(true);
                }}
                className="border px-4 py-2 flex justify-between cursor-pointer"
              >
                <p>{library.name}</p>
                <div className="rounded-full bg-green-500 px-4 text-sm text-white font-medium">
                  Tersedia
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showModal ? (
        <LibraryModal setShowModal={setShowModal} library={library} />
      ) : null}
    </>
  );
}
