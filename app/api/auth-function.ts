import { prisma } from "@/lib/prisma";
import { verify, JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function CheckAuth(req: NextRequest) {
    const token = req.cookies.get("auth-token")?.value as string
    console.log(token, "Token");


    if (!token) {
        throw { error: "Unauthorized" }
    }

    const userId = (verify(token, process.env.JWT_SECRET as string) as JwtPayload).id
    console.log(userId);

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw { error: "User not found" }
    }

    return user
}