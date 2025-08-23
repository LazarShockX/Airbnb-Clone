import { EmptyState } from "@/app/components/EmptyState";
import { ReservationsClient } from "./ReservationsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="Please login" />
        );
    }

    const reservations = await getReservations({
        params: Promise.resolve({ authorId: currentUser.id }),
    });

    if (reservations.length === 0) {
        return (
            <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties" />
        );
    }

    return (
        <ReservationsClient currentUser={currentUser} reservations={reservations} />
    );
}

export default ReservationsPage;
