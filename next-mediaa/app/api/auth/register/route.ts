import { NextRequest,NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { error, log } from "console";

export  async function POST(request:NextRequest){
try {
    const {email,password} = await request.json()
    if(!email || !password){
        return NextResponse.json(
            {error:"email and password are required"},
            {status:400}
        )
    }
    console.log("connecting")
    await connectToDB()
    console.log("connected")
    const existingUser = await User.findOne({email});
    if(existingUser){
        return NextResponse.json(
            {error:"user already exits"},
            {status:400}
        );
    }
    await User.create(
        {
            email,
            password
        }
    )
    return NextResponse.json(
        {message:"account created"},
        {status:201}
)
} catch (error) {
    return NextResponse.json(
        {message:"failed to register"},
        {status:500}
)
}
}