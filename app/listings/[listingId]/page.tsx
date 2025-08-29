import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import { EmptyState } from "@/app/components/EmptyState";

import { ListingClient } from "./ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
    const resolvedParams = await params;
    const listing = await getListingById({ params: Promise.resolve(resolvedParams) });
    const reservations = await getReservations({ params: Promise.resolve(resolvedParams) });
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState />
        );
    }
    
    return (
        <div>
            <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
        </div>
    );
}

export default ListingPage;
