import StaffAddForm from "./StafAddForm";
import StaffTable from "./StaffTable";
import Link from "next/link";

export default async function StaffPage({ searchParams }) {
  const { add } = searchParams;
  const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === "{}";
  };
  const getStaff = async () => {
    const res = await fetch(
      process.env.API_URL + "/role?name=Staff&user=true",
      { cache: "no-store" }
    );
    const data = await res.json();
    const staff = data.data[0];

    return staff;
  };

  const getUser = async () => {
    const res = await fetch(process.env.API_URL + "/user?is_user=true");
  };

  let staffs = await getStaff();

  return (
    <>
      <div className="rounded shadow border p-4">
        {isEmptyObject(searchParams) ? (
          <StaffTable staffs={staffs.users} />
        ) : null}
        {add ? <StaffAddForm /> : null}
      </div>
    </>
  );
}
