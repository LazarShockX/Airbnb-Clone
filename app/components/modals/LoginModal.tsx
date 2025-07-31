"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";

import { Button } from "../Button";
import { Heading } from "../Heading";
import { Input } from "../inputs/Input";

import { Modal } from "./Modal";

export const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account" />
            <Input id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
            <Input id="password" label="Password" type="password" disabled={isLoading} required register={register} errors={errors} />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button label="Continue with Google" onClick={() => signIn("google")} outline icon={FcGoogle} />
            <Button label="Continue with GitHub" onClick={() => signIn("github")} outline icon={AiFillGithub} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Don't have an account?
                    </div>
                    <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal isOpen={loginModal.isOpen} onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} title="Login" body={bodyContent} footer={footerContent} actionLabel="Continue" disabled={isLoading} />
    );
}
