import Image, { StaticImageData } from "next/image";
import React from "react";

type CardData = {
    title: string;
    icon: string | StaticImageData;
    value: string | number;
    meta: string;
};

const cardsData: CardData[] = [
    {
        title: "Total Dorm Listings",
        icon: "/icons/Beds icon.svg",
        value: 24,
        meta: "+3 this month",
    },
    {
        title: "Listing Limit",
        icon: "/icons/Component 3.svg",
        value: 50,
        meta: "30% used",
    },
    {
        title: "Profile Views",
        icon: "/icons/eye.svg",
        value: 2847,
        meta: "+20 this month",
    },
    {
        title: "Most Popular Dorm",
        icon: "/icons/users-03.svg",
        value: "Kennedy Commons",
        meta: "1,243 views",
    },
];

const Card = ({ title, icon, value, meta }: CardData) => {
    return (
        <div
            className="group rounded-lg cursor-pointer bg-white px-6 py-4 shadow-md 
      flex items-start justify-between 
      transition-all duration-300
      hover:bg-linear-to-r hover:from-[#155DFC] hover:to-[#003DC5]"
        >
            <div className="flex flex-col items-start justify-center">
                <div className="flex flex-col gap-3">
                    <h2 className="font-normal mb-2 text-gray-600 transition-colors duration-300 group-hover:text-white">
                        {title}
                    </h2>

                    <p
                        className={`font-semibold ${typeof value === "number" ? "text-2xl" : "text-lg"
                            } transition-colors duration-300 group-hover:text-white`}
                    >
                        {value}
                    </p>
                </div>

                <span className="mt-3 text-gray-600 transition-colors duration-300 group-hover:text-white">
                    {meta}
                </span>
            </div>

            <div
                className="flex items-center justify-center p-3 rounded-full 
        bg-[#EEF6FC] transition-colors duration-300
        group-hover:bg-white"
            >
                <Image
                    src={icon}
                    alt={`${title} icon`}
                    width={24}
                    height={24}
                    priority
                />
            </div>
        </div>
    );
};

const HeroCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
            {cardsData.map((card) => (
                <Card key={card.title} {...card} />
            ))}
        </div>
    );
};

export default HeroCards;