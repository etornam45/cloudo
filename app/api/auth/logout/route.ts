import { prisma } from "@/lib/prisma";
import { decode, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = cookies().get('auth-token')?.value
    if (!token) {
        return NextResponse.json({ error: "User not logged in" }, {
            headers: {
                "Content-Type": "application/json"
            },
            status: 401 // Unauthorized
        })
    }

    const userId = (decode(token) as JwtPayload).id as string

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        return NextResponse.json({ error: "User not found" }, {
            headers: {
                "Content-Type": "application/json"
            },
            status: 404 // Not found
        })
    }

    cookies().delete('auth-token')
    
    return NextResponse.json({ message: "Successfuly logged out" }, {
        headers: {
            "Content-Type": "application/json"
        },
        status: 200 // OK
    })
}