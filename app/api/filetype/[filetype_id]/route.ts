import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CheckAuth } from "../../auth-function";
import { Prisma } from "@prisma/client";


export async function GET(req: NextRequest, { params }: { params: { filetype_id: string } }) {
    try {
        await CheckAuth(req)
        const fileType = await prisma.fileType.findMany({
            where: {
                id: params.filetype_id,
            }
        })

        return NextResponse.json(fileType)

    } catch (error) {
        return NextResponse.json(error)
    }
}



export async function PATCH(req: NextRequest, { params }: { params: { filetype_id: string } }) {
    const body = await req.json() as Prisma.FileTypeCreateInput
    try {
        const fileType = await prisma.fileType.update({
            data: body,
            where: { id: params.filetype_id }
        })

        return NextResponse.json(fileType, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { filetype_id: string } }) {
    try {
        await prisma.fileType.delete({
            where: {
                id: params.filetype_id
            }
        })

        return NextResponse.json({
            message: "File Type Deleted Successfully"
        })

    } catch (error) {
        return NextResponse.json(error)
    }
}