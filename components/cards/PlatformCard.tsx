import React from "react";
import {
    Users,
    Download,
    UserPlus,
    UserCheck,
    TrendingUp,
    TrendingDown,
    Building2,
    Code2,
    GraduationCap,
    UserCog,
} from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    trend: string;
    icon: React.ElementType;
    iconColor?: string;
}

// 🔥 Helper للـ trend
const getTrendConfig = (trend: string) => {
    const isNegative = trend.trim().startsWith("-");

    return {
        isNegative,
        color: isNegative ? "text-red-500" : "text-emerald-500",
        Icon: isNegative ? TrendingDown : TrendingUp,
    };
};

const statsData: StatCardProps[] = [
    {
        title: "Total App Users",
        value: "58,429",
        trend: "+12.5%",
        icon: Users,
    },
    {
        title: "App Downloads",
        value: "124,582",
        trend: "+8.3%",
        icon: Download,
    },
];

const userStats = [
    {
        label: "New Users",
        value: "15,234",
        trend: "+18.2%",
        icon: UserPlus,
        color: "emerald",
    },
    {
        label: "Returning Users",
        value: "43,195",
        trend: "+5.7%",
        icon: UserCheck,
        color: "slate",
    },
];

const StatCard = ({ title, value, trend, icon: Icon }: StatCardProps) => {
    const { color, Icon: TrendIcon } = getTrendConfig(trend);

    return (
        <div
            className="bg-white group p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[197px] w-full transition-all duration-300
      hover:bg-gradient-to-r hover:from-[#155DFC] hover:to-[#003DC5]"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-slate-600 group-hover:text-white font-semibold text-sm">
                    {title}
                </h3>
                <div className="p-2 bg-slate-50 rounded-full text-slate-600 group-hover:bg-white">
                    <Icon size={24} />
                </div>
            </div>

            <span className="text-3xl font-bold text-slate-900 group-hover:text-white">
                {value}
            </span>

            <div className={`flex items-center mt-2 font-medium text-sm ${color}`}>
                <TrendIcon size={16} className="mr-1" />
                <span>{trend}</span>

                <span className="text-slate-400 group-hover:text-white ml-1 font-normal text-xs">
                    vs last period
                </span>
            </div>
        </div>
    );
};

const UserStatsCard = () => {
    return (
        <div
            className="bg-white group p-6 rounded-2xl border border-slate-100 shadow-sm w-full transition-all duration-300
      hover:bg-gradient-to-r hover:from-[#155DFC] hover:to-[#003DC5]"
        >
            <h3 className="text-slate-600 group-hover:text-white font-semibold text-sm mb-4">
                New vs Returning Users
            </h3>

            <div className="space-y-3">
                {userStats.map((user, index) => {
                    const Icon = user.icon;
                    const { color, Icon: TrendIcon } = getTrendConfig(user.trend);

                    return (
                        <React.Fragment key={user.label}>
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-2 rounded-full ${user.color === "emerald"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-slate-100 text-slate-600"
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </div>

                                    <div>
                                        <p className="text-[10px] group-hover:text-white text-slate-400 uppercase font-bold tracking-wider">
                                            {user.label}
                                        </p>
                                        <p className="text-xl group-hover:text-white font-bold text-slate-900">
                                            {user.value}
                                        </p>
                                    </div>
                                </div>

                                <div className={`flex items-center text-xs font-bold ${color}`}>
                                    <TrendIcon size={14} />
                                    <span>{user.trend}</span>
                                </div>
                            </div>

                            {index !== userStats.length - 1 && (
                                <div className="h-px bg-slate-100 w-full" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const statsCardTow: StatCardProps[] = [
    {
        title: "Total Properties Listed",
        value: "45,678",
        trend: "+6.5%",
        icon: Building2,
        iconColor: "#00BC7D",
    },
    {
        title: "Active Developer Account",
        value: "45,678",
        trend: "+6.4%",
        icon: Code2,
        iconColor: "#2B7FFF",
    },
    {
        title: "Active University Accounts",
        value: "89",
        trend: "+9.1%",
        icon: GraduationCap,
        iconColor: "#8E51FF",
    },
    {
        title: "Active Sub Admin Accounts",
        value: "12",
        trend: "-4.8%",
        icon: UserCog,
        iconColor: "#15803D",
    },
];

const StatsCardTow = ({
    title,
    value,
    trend,
    icon: Icon,
    iconColor,
}: StatCardProps) => {
    const { color, Icon: TrendIcon } = getTrendConfig(trend);

    return (
        <div
            className="bg-white group px-6 py-4 h-[170px] rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between w-full transition-all duration-300
      hover:bg-gradient-to-r hover:from-[#155DFC] hover:to-[#003DC5]"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-slate-600 group-hover:text-white font-semibold text-sm">
                    {title}
                </h3>

                <div
                    className="p-3 rounded-2xl group-hover:bg-white"
                    style={{
                        backgroundColor: `${iconColor}20`,
                        color: iconColor,
                    }}
                >
                    <Icon size={24} />
                </div>
            </div>

            <span className="text-3xl font-bold text-slate-900 group-hover:text-white">
                {value}
            </span>

            <div className={`flex items-center mt-2 font-medium text-sm ${color}`}>
                <TrendIcon size={16} className="mr-1" />
                <span>{trend}</span>

                <span className="text-slate-400 group-hover:text-white ml-1 font-normal text-xs">
                    vs last period
                </span>
            </div>
        </div>
    );
};

export default function PlatformCard() {
    return (
        <div className="flex flex-col gap-6 w-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}

                <UserStatsCard />
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-lg">
                    Listings & Operations Overview
                </h3>
                <p className="text-sm text-gray-500">
                    Inventory, accounts, and moderation metrics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {statsCardTow.map((stat) => (
                    <StatsCardTow key={stat.title} {...stat} />
                ))}
            </div>
        </div>
    );
}