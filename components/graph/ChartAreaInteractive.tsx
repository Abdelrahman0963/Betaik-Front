"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", Views: 0, Compares: 222, Saves: 120 },
    { date: "2024-04-02", Views: 3, Compares: 180, Saves: 90 },
    { date: "2024-04-03", Views: 5, Compares: 120, Saves: 80 },
    { date: "2024-04-04", Views: 1000, Compares: 260, Saves: 110 },
    { date: "2024-04-05", Views: 30, Compares: 290, Saves: 130 },
    { date: "2024-04-06", Views: 40, Compares: 340, Saves: 150 },
    { date: "2024-04-07", Views: 90, Compares: 180, Saves: 95 },
    { date: "2024-04-08", Views: 10, Compares: 3020, Saves: 170 },
    { date: "2024-04-09", Views: 70, Compares: 110, Saves: 40 },
    { date: "2024-04-10", Views: 100, Compares: 190, Saves: 70 },
    { date: "2024-04-11", Views: 100, Compares: 350, Saves: 110 },
    { date: "2024-04-12", Views: 100, Compares: 210, Saves: 85 },
    { date: "2024-04-13", Views: 200, Compares: 380, Saves: 135 },
    { date: "2024-04-14", Views: 5000, Compares: 220, Saves: 60 },
    { date: "2024-04-15", Views: 6100, Compares: 170, Saves: 55 },
    { date: "2024-04-16", Views: 8200, Compares: 190, Saves: 75 },
    { date: "2024-04-17", Views: 8088, Compares: 360, Saves: 180 },
    { date: "2024-04-18", Views: 8088, Compares: 410, Saves: 165 },
    { date: "2024-04-19", Views: 8888, Compares: 180, Saves: 95 },
    { date: "2024-04-20", Views: 9000, Compares: 150, Saves: 35 },
    { date: "2024-04-21", Views: 8088, Compares: 200, Saves: 75 },
    { date: "2024-04-22", Views: 8180, Compares: 170, Saves: 95 },
    { date: "2024-04-23", Views: 8948, Compares: 230, Saves: 65 },
    { date: "2024-04-24", Views: 9852, Compares: 290, Saves: 120 },
    { date: "2024-04-25", Views: 10200, Compares: 250, Saves: 100 },
    { date: "2024-04-26", Views: 8648, Compares: 130, Saves: 30 },
    { date: "2024-04-27", Views: 10850, Compares: 420, Saves: 165 },
    { date: "2024-04-28", Views: 8888, Compares: 180, Saves: 55 },
    { date: "2024-04-29", Views: 88888, Compares: 240, Saves: 95 },
    { date: "2024-04-30", Views: 41554, Compares: 380, Saves: 175 },
    { date: "2024-05-01", Views: 7900, Compares: 220, Saves: 75 },
    { date: "2024-05-02", Views: 6000, Compares: 310, Saves: 135 },
    { date: "2024-05-03", Views: 5000, Compares: 190, Saves: 85 },
    { date: "2024-05-04", Views: 8000, Compares: 420, Saves: 140 },
    { date: "2024-05-05", Views: 1258, Compares: 390, Saves: 180 },
    { date: "2024-05-06", Views: 8269, Compares: 520, Saves: 195 },
    { date: "2024-05-07", Views: 1250, Compares: 300, Saves: 135 },
    { date: "2024-05-08", Views: 7900, Compares: 210, Saves: 65 },
    { date: "2024-05-09", Views: 899, Compares: 180, Saves: 75 },
    { date: "2024-05-10", Views: 1000, Compares: 330, Saves: 115 },
    { date: "2024-05-11", Views: 8500, Compares: 270, Saves: 135 },
    { date: "2024-05-12", Views: 8666, Compares: 240, Saves: 85 },
    { date: "2024-05-13", Views: 47888, Compares: 160, Saves: 65 },
    { date: "2024-05-14", Views: 55555, Compares: 410, Saves: 150 },
    { date: "2024-05-15", Views: 78956, Compares: 220, Saves: 95 },
    { date: "2024-05-16", Views: 78799, Compares: 190, Saves: 75 },
    { date: "2024-05-17", Views: 79859, Compares: 150, Saves: 65 },
    { date: "2024-05-18", Views: 84589, Compares: 430, Saves: 185 },
    { date: "2024-05-19", Views: 89648, Compares: 350, Saves: 135 },
    { date: "2024-06-1", Views: 95866, Compares: 200, Saves: 75 },
    { date: "2024-06-2", Views: 64799, Compares: 20, Saves: 75 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    Views: {
        label: "Views",
        color: "#7a73f5",
    },
    Compares: {
        label: "Compares",
        color: "#a1bfff",

    },
    Saves: {
        label: "Saves",
        color: "#145efc",
    },
} satisfies ChartConfig


export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className=" sm:block hidden w-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Dorm Performance</CardTitle>
                    <CardDescription>
                        Track dorm engagement over time
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-96 w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#7a73f5"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#7a73f5"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#a1bfff"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#a1bfff"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillTablet" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#145efc"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#145efc"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="Views"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="#145efc"
                            stackId="a"
                        />
                        <Area
                            dataKey="Compares"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="#7a73f5"
                            stackId="a"
                        />
                        <Area
                            dataKey="Saves"
                            type="natural"
                            fill="url(#fillTablet)"
                            stroke="#a1bfff"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
