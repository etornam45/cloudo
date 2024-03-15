import { NextRequest, NextResponse } from "next/server";
import { CheckAuth } from "../auth-function";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export async function GET(req: NextRequest) {
    try {
        const user = await CheckAuth(req);

        const files = await prisma.file.findMany({
            where: {
                owner_id: user.id
            }
        })

        return NextResponse.json(files, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}


export async function POST(req: NextRequest) {
    const body = await req.json() as Prisma.FileCreateManyInput

    try {

        const user = await CheckAuth(req)

        const file_size: number = 561298 // Hard codded value 

        const data = {
            owner_id: user.id as string,
            name: body.name,
            folder_id: body.folder_id,
            size_bytes: file_size,
            type_id: "ewewewewewewewe", // Hard coded value
        }

        const file = await prisma.file.create({
            data: {...body, 
                folder_id: body.folder_id, // 
            } 
        })

    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}