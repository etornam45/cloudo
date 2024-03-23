import { NextRequest, NextResponse } from "next/server";
import { CheckAuth } from "../auth-function";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
    try {
        await CheckAuth(req);

        const fileTypes = await prisma.fileType.findMany({
            include: {
                _count: true
            }
        })

        return NextResponse.json(fileTypes)

    } catch (error) {
        return NextResponse.json(error)
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await CheckAuth(req)

        const fileType = await prisma.fileType.create({
            data: body
        })

    } catch (error) {
        return NextResponse.json(error)
    }
}