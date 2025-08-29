"use client";

import { Suspense, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";

import { useSearchModal } from "@/app/hooks/useSearchModal";
import { useCountries } from "@/app/hooks/useCountries";

const SearchContent = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get("locationValue");
    const startDate = params?.get("startDate");
    const endDate = params?.get("endDate");
    const guestCount = params?.get("guestCount");

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return "Anywhere";
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);

            if (diff === 0) {
                diff = 1;
            }

            return `${diff} Days`;
        }

        return "Any week";
    }, [startDate, endDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }

        return "Add Guests";
    }, [guestCount]);
    
    return (
        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer border-gray-200">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] border-gray-200 flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {guestLabel}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Search = () => {
    return (
        <Suspense fallback={
            <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer border-gray-200">
                <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold px-6">
                        Anywhere
                    </div>
                    <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] border-gray-200 flex-1 text-center">
                        Any week
                    </div>
                    <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                        <div className="hidden sm:block">
                            Add Guests
                        </div>
                        <div className="p-2 bg-rose-500 rounded-full text-white">
                            <BiSearch size={18} />
                        </div>
                    </div>
                </div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
};
