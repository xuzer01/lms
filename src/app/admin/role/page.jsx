import RoleTable from "./role_table";
import Link from "next/link";

export default async function RolePage() {
  const getRoles = async () => {
    const res = await fetch(process.env.API_URL + "/role", {
      cache: "no-store",
    });
    const data = await res.json();

    return data.data;
  };
  let roles = await getRoles();
  return (
    <div className="rounded shadow border p-4">
      <h1 className="uppercase font-bold text-xl mb-10">List Role</h1>
      <Link
        className=" bg-blue-500 px-4 py-2 text-white rounded-md"
        href={"./role/add"}
      >
        Tambah
      </Link>
      <div className="mt-5">
        <RoleTable roles={roles} />
      </div>
    </div>
  );
}
