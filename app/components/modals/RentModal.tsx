"use client";

import axios from "axios";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRentModal } from "@/app/hooks/useRentModal";

import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { CountrySelect } from "../inputs/CountrySelect";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";

enum Steps {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(Steps.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
    const imageSrc = watch("imageSrc");

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== Steps.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post("/api/listings", data) 
            .then(() => {
                toast.success("Listing created!");
                router.refresh();
                reset();
                setStep(Steps.CATEGORY);
                rentModal.onClose();
            })
            .catch((error) => {
                toast.error("All fields are required");
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                <hr className="border-gray-200" />
                <Counter title="Rooms" subtitle="How many rooms do you have?" value={roomCount} onChange={(value) => setCustomValue("roomCount", value)} />
                <hr className="border-gray-200" />
                <Counter title="Bathrooms" subtitle="How many bathrooms do you have?" value={bathroomCount} onChange={(value) => setCustomValue("bathroomCount", value)} />
            </div>
        );
    }

    if (step === Steps.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
            </div>
        );
    }

    if (step === Steps.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your place?" subtitle="Short and sweet works best" />
                <Input id="title" label="Title" disabled={isLoading} required register={register} errors={errors} />
                <hr className="border-gray-200" />
                <Input id="description" label="Description" disabled={isLoading} required register={register} errors={errors} />
            </div>
        );
    }

    if (step === Steps.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Now, set your price" subtitle="How much do you want to charge per night?" />
                <Input id="price" label="Price" disabled={isLoading} type="number" formatPrice required register={register} errors={errors} />
            </div>
        );
    }
    
    return (
        <div>
            <Modal 
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                title="Airbnb your home"
                body={bodyContent}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === Steps.CATEGORY ? undefined : onBack} // If on the first step, no back action
            />
        </div>
    );
}
