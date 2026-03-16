import Image from 'next/image';
import React from 'react';

// تم تعديل الاسم ليكون أوضح
type CardData = {
    title: string;
    icon: string;
    value: string | number;
    data: string;
};

const cardsData: CardData[] = [
    {
        title: "Total Dorm Listings",
        icon: "/icons/Beds icon.svg",
        value: 24,
        data: "+3 this month"
    }, {
        title: "Listing Limit",
        icon: "/icons/line-chart-up-02.svg",
        value: 50,
        data: "30% used"
    }, {
        title: "Profile Views",
        icon: "/icons/Icon (2).svg",
        value: 2847,
        data: "+20 this month"
    }, {
        title: "Most Popular Dorm",
        icon: "/icons/users-03.svg",
        value: "Kennedy Commons",
        data: "1,243 views"
    }
];

const HeroCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
            {cardsData.map((card) => (
                <div
                    // 🚀 استخدمنا title كـ key بدلاً من الـ index لتقليل عمليات الـ DOM Updates العشوائية
                    key={card.title}
                    className="group rounded-lg cursor-pointer bg-white px-6 py-4 shadow-md 
                 flex items-start justify-between 
                 transition-all duration-300
                 hover:bg-gradient-to-r hover:from-[#155DFC] hover:to-[#003DC5]"
                // ملاحظة: تم تعديل hover:bg-linear-to-r إلى hover:bg-gradient-to-r (صيغة Tailwind الصحيحة)
                >
                    <div className="flex flex-col items-start justify-center">
                        {/* 🚀 تم تغيير <nav> إلى <div> لأنه ليس قائمة روابط */}
                        <div className="flex flex-col gap-3">
                            <h2 className="font-semibold mb-2 text-gray-600 transition-colors duration-300 group-hover:text-white">
                                {card.title}
                            </h2>

                            <p className={`font-semibold ${typeof card.value === 'number' ? 'text-2xl' : 'text-lg'} transition-colors duration-300 group-hover:text-white`}>
                                {card.value}
                            </p>
                        </div>
                        <span className="mt-3 text-gray-600 transition-colors duration-300 group-hover:text-white">
                            {card.data}
                        </span>
                    </div>

                    <div
                        className="flex items-center justify-center p-3 rounded-full 
                   bg-[#EEF6FC] transition-colors duration-300
                   group-hover:bg-white"
                    >
                        <Image
                            src={card.icon}
                            alt={`${card.title} icon`}
                            width={24}
                            height={24}
                            priority
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroCards;