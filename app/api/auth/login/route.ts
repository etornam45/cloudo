import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json() as Prisma.UsersUncheckedUpdateManyWithoutStoragePlanInput


    try {
        const user = await prisma.users.findFirst({
            where: {
                email: body.email as string
            }
        })

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }

            })
        }

        const passwordMatch = bcrypt.compareSync(body.password as string, user.password as string)

        if (!passwordMatch) {
            return NextResponse.json({
                error: "Password does not match"
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 401
            })
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        })

        cookies().set('auth-token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        })

        return NextResponse.json({...user, password: null // remove password from response
        }, {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {
        return NextResponse.json(error, {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}