"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () => {
    const router = useRouter();

    return (
        <Image src="/images/logo.png" className="hidden md:block cursor-pointer" alt="Logo" height="100" width="100" />
    );
}
