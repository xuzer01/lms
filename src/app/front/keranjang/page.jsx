import CartItem from "./CartItem";
import { cookies } from "next/headers";
import Description from "./Description";

async function getUserCart() {
  const token = cookies().get("token");
  if (token) {
    const res = await fetch(process.env.API_URL + "/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Gagal memuat data");
    } else {
      const data = await res.json();
      return data.data;
    }
  }
}

export default async function Page() {
  const token = cookies().get("token");
  const carts = await getUserCart();

  return (
    <div className="flex justify-center">
      <div className="justify-center items-center w-1/3 flex flex-col">
        <h1 className="uppercase font-bold mt-10">Keranjang Anda</h1>
        <div className="flex flex-col space-y-2 mt-4 w-full">
          {token ? (
            Object.keys(carts).length > 0 ? (
              carts.map((cart) => {
                return (
                  <>
                    <CartItem key={cart.id} cart={cart} />
                  </>
                );
              })
            ) : (
              <div className="text-center">Keranjang anda kosong</div>
            )
          ) : (
            <div className="text-center">Silahkan login terlebih dahulu</div>
          )}

          {token ? <Description carts={carts} /> : null}
        </div>
      </div>
    </div>
  );
}
