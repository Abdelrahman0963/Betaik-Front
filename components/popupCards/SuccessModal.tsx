"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SuccessModal({ setShowSuccess, message, description }: { setShowSuccess: (value: boolean) => void, message: string, description: string }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-white/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[400px] text-center shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                        <Image src="/icons/successfully.svg" alt="successfully" width={24} height={24} />
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                    {message}
                </h2>
                <p className="text-gray-500 mb-6">
                    {description}
                </p>
                <button
                    onClick={() => setOpen(false)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
}