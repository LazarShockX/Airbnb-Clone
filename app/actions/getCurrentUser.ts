import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/app/libs/prismadb";

export async function getSession() {
    const cookieStore = await cookies();
    return await getServerSession({
        req: {
            headers: {
                cookie: cookieStore.toString()
            }
        },
        ...authOptions
    });
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error: unknown) {
        console.error("Failed to get current user: ", error);
        return null;
    }
}
