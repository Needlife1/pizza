
import { prisma } from "@/prisma/prismaClient";
import { ProfileForm } from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib/getUserSassion";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const  session  = await getUserSession();

    if (!session) {
      return redirect('/not-auth');
    }
    
    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id),
        }
    });

    if (!user) {
        return redirect('/not-auth');
    }

    return <ProfileForm data={user} />;
}