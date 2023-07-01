export default function LoginForm() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg border p-4">
          <form>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="border shadow-md px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border shadow-md px-2"
              />
            </div>
            <button className="mt-4 uppercase text-sm bg-blue-500 rounded-md text-white py-1 mx-auto w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
