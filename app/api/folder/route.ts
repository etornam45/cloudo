import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CheckAuth } from "../auth-function";


export async function GET(req: NextRequest) {
    try {

        const user = await CheckAuth(req)

        const folders = await prisma.folder.findMany({
            where: {
                owner_id: user.id
            },
            include: {
                files: true,
                Folder: true,
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

        const user = await CheckAuth(req)

        
        const parentFolder = await prisma.folder.findFirst({
            where: {
                name: user.username,
                owner_id: user.id,
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
                owner_id: user.id,
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