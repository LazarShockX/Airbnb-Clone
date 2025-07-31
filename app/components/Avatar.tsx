"use client";

import Image from "next/image";

interface AvatarProps {
    src?: string | null;
}

export const Avatar = ({ src }: AvatarProps) => {
    return (
        <Image src={src || "/images/placeholder.jpg"} className="rounded-full" alt="Avatar" height="30" width="30" />
    );
}
