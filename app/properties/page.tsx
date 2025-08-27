import { EmptyState } from "@/app/components/EmptyState";
import { PropertiesClient } from "./PropertiesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="Please login" />
        );
    }

    const listings = await getListings({
        params: Promise.resolve({ userId: currentUser.id }),
    });

    if (listings.length === 0) {
        return (
            <EmptyState title="No properties found" subtitle="Looks like you have no properties" />
        );
    }

    return (
        <PropertiesClient currentUser={currentUser} listings={listings} />
    );
}

export default PropertiesPage;
