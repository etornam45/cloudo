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

        return NextResponse.json({...user, password: undefined})
    } catch (error) {
        return NextResponse.json(error)
    }
}