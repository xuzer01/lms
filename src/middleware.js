import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

export default async function middleware(request) {
  //   const token = getCookie("token");
  //   console.log(request.nextUrl.pathname.startsWith("/admin"));
  //   if (request.nextUrl.pathname.startsWith("/admin")) {
  //     if (token === null) {
  //       return NextResponse.redirect(new URL("/auth", request.url));
  //     }
  //     // return NextResponse.rewrite(new URL('/about-2', request.url))
  //   }
}
