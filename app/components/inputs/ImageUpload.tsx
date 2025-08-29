"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: unknown;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export const ImageUpload = ({ onChange, value}: ImageUploadProps) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            onChange(result.info.secure_url);
        }
    }, [onChange]);

    return (
        <CldUploadWidget onSuccess={handleUpload} uploadPreset={uploadPreset} options={{ maxFiles: 1 }}>
            {({ open }) => {
                return (
                    <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image src={value} alt="Uploaded Image" fill style={{ objectFit: "cover" }} />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
}