import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const verifyToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || ""
        const tokenData:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return tokenData.id
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}