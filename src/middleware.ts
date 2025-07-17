import { api } from "@/trpc/server";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Test connection to firewall
  const response = await api.firewall.testConnection();

  if (!response.success) {
    return NextResponse.redirect(new URL("/no-connection", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
}