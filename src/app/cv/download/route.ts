import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const external = process.env.NEXT_PUBLIC_CV_URL;
  if (external) {
    return NextResponse.redirect(external);
  }
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/cv.pdf`);
}
