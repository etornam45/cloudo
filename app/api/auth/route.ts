import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import bcrypt from 'bcryptjs';

import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const body = await req.json() as unknown as Prisma.UsersCreateInput

    try {
        const storagePlan = await prisma.storagePlan.findFirst({
            where: {
                price: 0
            }
        })

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(body.password, salt);

        const user = await prisma.users.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
                storagePlanId: storagePlan?.id
            }
        })

        const baseFolder = await prisma.folder.create({
            data: {
                name: user.username,
                owner_id: user.id,
                parent_id: undefined,
                created_at: new Date() // Add the created_at property with the current date
            }
        })

        return NextResponse.json({ ...user, password: undefined, baseFolder })
    } catch (error) {
        return NextResponse.json(error)
    }
}