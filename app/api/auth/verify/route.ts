import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
    try {
    const code = request.nextUrl.searchParams.get('code');
    
        if (!code) {
            return NextResponse.json({error: "Код не вірний"}, {status: 400})
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            }
        });

        if( !verificationCode) {
            return NextResponse.json({error: "Код не вірний"}, {status: 400})
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verified: new Date(),
            }
        })

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            }
        })

        return NextResponse.redirect(new URL ('/?verified', request.url));

} catch (error) {
    console.error(error);
    console.log('[VERIFY_GET] Server error', error);
    
  }
    
}
