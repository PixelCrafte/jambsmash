import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest){

    console.log(request);

    // Here you would typically handle the form submission, e.g., save to a database
    return NextResponse.json({ success: true });
}