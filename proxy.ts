import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PUBLIC_PATHS = ["/sign-in", "/sign-up"];
const PRIVATE_PATHS = ["/profile", "/notes"];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const url = req.nextUrl.clone();

  const isPublic = PUBLIC_PATHS.some((path) => url.pathname.startsWith(path));
  const isPrivate = PRIVATE_PATHS.some((path) => url.pathname.startsWith(path));

  if (!accessToken && refreshToken) {
    const sessionResponse = await checkSession();

if (!sessionResponse) {
  url.pathname = "/sign-in";
  return NextResponse.redirect(url);
}

const session = sessionResponse.data;

    const response = NextResponse.next();

    response.cookies.set("accessToken", session.accessToken, {
      httpOnly: true,
      path: "/",
    });
    if (session.refreshToken) {
      response.cookies.set("refreshToken", session.refreshToken, {
        httpOnly: true,
        path: "/",
      });
    }

    return response;
  }

  if (!accessToken && isPrivate) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (accessToken && isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
