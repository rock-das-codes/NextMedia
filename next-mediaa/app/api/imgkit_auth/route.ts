import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.IMGKIURL!,
});

export async function GET() {
    try {
        return NextResponse.json(imagekit.getAuthenticationParameters());
    } catch (error) {
        return NextResponse.json(
            {error:"image kit error"},
            {status:500}

        );
    }

}