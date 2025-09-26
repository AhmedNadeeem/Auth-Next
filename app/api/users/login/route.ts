import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});
        if(!user) NextResponse.json({ error: "User doesn't exists" }, { status: 400 });
        console.log(user);

        const validPass = await bcryptjs.compare(password, user.password);
        if(!validPass) NextResponse.json({ error: "Check your credentials" }, { status: 400 });

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 });
    }
}