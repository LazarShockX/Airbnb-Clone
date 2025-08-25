import { EmptyState } from "@/app/components/EmptyState";
import { FavoritesClient } from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if (listings.length === 0) {
        return (
            <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings" />
        );
    }

    return (
        <FavoritesClient currentUser={currentUser} listings={listings} />
    );
}

export default ListingPage;
