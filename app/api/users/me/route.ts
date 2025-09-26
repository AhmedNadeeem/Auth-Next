import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/helpers/verifyToken";

connect();

export async function GET(req:NextRequest){
    const userId = await verifyToken(req);

    const user = await User.findById(userId).select("-password");
    //
    return NextResponse.json( {message: "User found", data: user}, { status: 200 } )
}