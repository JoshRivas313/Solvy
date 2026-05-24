import { NextResponse, type NextRequest } from "next/server";

// Auth is handled at the page level via Supabase server components.
// This middleware only passes requests through.
export function middleware(request: NextRequest) {
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
