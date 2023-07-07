import LoginForm from "./loginForm";
import { cookies } from "next/headers";

export default async function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
