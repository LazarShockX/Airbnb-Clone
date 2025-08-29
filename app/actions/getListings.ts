import { prisma } from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    bathroomCount?: number;
    guestCount?: number;
    roomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(context: { params: Promise<IListingsParams> }) {
    try {
        const { userId, bathroomCount, guestCount, roomCount, startDate, endDate, locationValue, category } = await context.params;

        const query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            },
                            {
                                startDate: { gte: startDate },
                                endDate: { lte: endDate }
                            }, 
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: unknown) {
        console.error("Failed to get listings: ", error);
        return [];
    }
}
