import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { JwtPayload, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { folderId: string } }) {
    try {
        const { folderId } = params
        console.log(folderId);

        const token = cookies().get("auth-token")?.value as string

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const userId = (verify(token, process.env.JWT_SECRET as string) as JwtPayload).id

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            })
        }

        const folders = await prisma.folder.findFirst({
            where: {
                owner_id: userId,
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
        const token = cookies().get("auth-token")?.value as string

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const userId = (verify(token, process.env.JWT_SECRET as string) as JwtPayload).id

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            })
        }

        const folder = await prisma.folder.update({
            where: {
                id: folderId
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
        const token = cookies().get("auth-token")?.value as string

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const userId = (verify(token, process.env.JWT_SECRET as string) as JwtPayload).id

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            })
        }

        const folder = await prisma.folder.delete({
            where: {
                id: folderId
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