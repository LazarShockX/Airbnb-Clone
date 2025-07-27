"use client";

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

export const MenuItem = ({ label, onClick }: MenuItemProps) => {
    return (
        <div onClick={onClick} className="py-3 px-4 hover:bg-neutral-100 transition font-semibold">
            {label}
        </div>
    );
}
