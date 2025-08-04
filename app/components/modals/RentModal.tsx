"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useRentModal } from "@/app/hooks/useRentModal";

import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { CountrySelect } from "../inputs/CountrySelect";
import { Counter } from "../inputs/Counter";

enum Steps {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(Steps.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: ""
        }
    });

    const category = watch("category"); // Watch the category field from the form
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true, // Marks the field as changed
            shouldTouch: true, // Marks the field as interacted with
            shouldValidate: true, // Validates the field
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => { // useMemo memoizes the computed value (return statement)
        if (step === Steps.PRICE) {
            return "Create";
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === Steps.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue("category", category)}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === Steps.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Help guests find you" />
                <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === Steps.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />
                <Counter title="Guests" subtitle="How many guests do you allow?" value={guestCount} onChange={(value) => setCustomValue("guestCount", value)} />
                <hr />
                <Counter title="Rooms" subtitle="How many rooms do you have?" value={roomCount} onChange={(value) => setCustomValue("roomCount", value)} />
                <hr />
                <Counter title="Bathrooms" subtitle="How many bathrooms do you have?" value={bathroomCount} onChange={(value) => setCustomValue("bathroomCount", value)} />
            </div>
        );
    }
    
    return (
        <div>
            <Modal 
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={onNext}
                title="Airbnb your home"
                body={bodyContent}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === Steps.CATEGORY ? undefined : onBack} // If on the first step, no back action
            />
        </div>
    );
}
