import { EmptyState } from "@/app/components/EmptyState";
import { TripsClient } from "./TripsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="Please login" />
        );
    }

    const reservations = await getReservations({
        params: Promise.resolve({ userId: currentUser.id }),
    });

    if (reservations.length === 0) {
        return (
            <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips." />
        );
    }

    return (
        <TripsClient currentUser={currentUser} reservations={reservations} />
    );
}

export default TripsPage;
