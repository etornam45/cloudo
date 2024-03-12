import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const token = cookies().get("auth-token")?.value as string



        if (!token) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const userId = (verify(token, process.env.JWT_SECRET as string) as JwtPayload).id
        console.log(userId);

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

        const folders = await prisma.folder.findMany({
            where: {
                owner_id: userId
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


export async function POST(req: NextRequest) {
    const body = await req.json() as Prisma.FolderCreateManyInput

    try {

        const token = cookies().get("auth-token")?.value as string

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401,
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

        const parentFolder = await prisma.folder.findFirst({
            where: {
                name: user.username,
                owner_id: userId,
                parent_id: null
            },
        });

        if (!parentFolder) {
            return NextResponse.json({
                message: "Parent folder not found",
            }, {
                status: 404,
            });
        }

        const folder = await prisma.folder.create({
            data: {
                name: body.name,
                owner_id: userId,
                parent_id: parentFolder.id,
                created_at: new Date(),
            }
        })

        return NextResponse.json(folder);

    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}