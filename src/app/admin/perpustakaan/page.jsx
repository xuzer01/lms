import Swal from "sweetalert2";
import PerpustakaanTable from "./PerpustakaanTable";
import Link from "next/link";

export default async function Perpustakaan() {
  const getPerpustakaan = async () => {
    const response = await fetch(process.env.API_URL + "/library", {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return data.data;
    } else {
      Swal.fire("Error", "Gagal mengambil data", "error");
      return null;
    }
  };

  let perpustakaan = await getPerpustakaan();

  return (
    <div className="rounded shadow border p-4">
      <div className="uppercase font-bold text-xl mb-10">List Perpustakaan</div>
      <Link
        className="rounded-md shadow bg-blue-500 text-white px-4 py-2"
        href={"./perpustakaan/add"}
      >
        Tambah
      </Link>
      <div className="mt-4">
        <PerpustakaanTable perpustakaan={perpustakaan} />
      </div>
    </div>
  );
}
