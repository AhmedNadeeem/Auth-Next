import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST( req: NextRequest ){
    try {
        const reqBody = await req.json();
        const { username, email, passsword } = reqBody;
        // validation
        console.log(reqBody);

        const user = await User.findOne({ email });

        if(user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(passsword, salt);

        const newUser = new User({
            username,
            email,
            password: hashPass,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered successfully!",
            success: true,
            savedUser,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}