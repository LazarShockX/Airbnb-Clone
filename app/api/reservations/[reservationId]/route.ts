import { prisma } from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, context: { params: Promise<IParams> }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = await context.params;

    if (!reservationId || typeof reservationId !== "string") {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: currentUser.id, // Allow deletion if the current user made the reservation
                },
                {
                    listing: {
                        userId: currentUser.id, // Allow deletion if the current user owns the listing
                    }
                }
            ]
        }
    });

    return NextResponse.json(reservation);
}
