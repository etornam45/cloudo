import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function POST(req: Request) {
    const body = await req.json() as unknown as Prisma.UsersCreateInput
    console.log(body);
    try {
        return Response.json(await prisma.users.create({data: {...body}}))
    } catch (error) {
        return Response.json(error)
    }
}