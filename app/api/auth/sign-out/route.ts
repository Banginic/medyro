import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request){
    const storedCookie = cookies();
    ( await storedCookie).delete('admin-token');
    return NextResponse.json({ success: true, message: 'Log out successfully'}, { status: 200})
}