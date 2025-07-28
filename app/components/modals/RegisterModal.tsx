"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";

import { Button } from "../Button";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";

import { Modal } from "./Modal";

export const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account" />
            <Input id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
            <Input id="name" label="Name" disabled={isLoading} required register={register} errors={errors} />
            <Input id="password" label="Password" type="password" disabled={isLoading} required register={register} errors={errors} />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button label="Continue with Google" onClick={() => {}} outline icon={FcGoogle} />
            <Button label="Continue with GitHub" onClick={() => {}} outline icon={AiFillGithub} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal isOpen={registerModal.isOpen} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} title="Register" body={bodyContent} footer={footerContent} actionLabel="Continue" disabled={isLoading} />
    );
}
