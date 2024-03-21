import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { CheckAuth } from "../../auth-function"

export async function GET(req: NextRequest, { params }: { params: { folderId: string } }) {
    try {
        const { folderId } = params
        console.log(folderId);
        const user = await CheckAuth(req)
        

        const folders = await prisma.folder.findFirst({
            where: {
                owner_id: user.id,
                id: folderId,
            }
        })

        return NextResponse.json(folders, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { folderId: string } }) {
    try {
        const body = await req.json() as Prisma.FolderUpdateInput
        const { folderId } = params
        const user = await CheckAuth(req)

        const folder = await prisma.folder.update({
            where: {
                id: folderId,
                owner_id: user.id
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(folder, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}


export async function DELETE(req: NextRequest, params: { folderId: string }) {
    try {
        const { folderId } = params
        const user = await CheckAuth(req)

        const folder = await prisma.folder.delete({
            where: {
                id: folderId,
                owner_id: user.id
            }
        })

        return NextResponse.json(folder, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}