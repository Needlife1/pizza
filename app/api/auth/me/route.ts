import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSassion";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = await getUserSession();

        if (!user) {
            return NextResponse.json({message: 'Ви не авторизовані'}, { status: 401 });
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id),
            },
            select: {
                fullName: true,
                email: true,
                password: false,
            },
        });

return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
        
    }
}