import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

export default function LibraryModal({ setShowModal, library }) {
  const addToCart = async () => {
    const token = getCookie("token");
    const response = await fetch(process.env.API_URL + "/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        library_book_id: library.library_books.id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      const errors = data.errors;
      console.log(errors);
      errors.map((error) => {
        toast(error.msg, { type: "error" });
      });
      throw new Error(data.errors);
    }
  };
  const confirmationHandler = async () => {
    const t = toast.loading("Loading...");
    try {
      await addToCart();
      toast.update(t, {
        render: "Berhasil menambahkan item",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      setShowModal(false);
    } catch (error) {
      toast.dismiss(t);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{library.name}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Tambahkan ke Keranjang? Anda harus mengambil buku secara manual
                di perpustakaan yang telah dipilih
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={confirmationHandler}
              >
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
