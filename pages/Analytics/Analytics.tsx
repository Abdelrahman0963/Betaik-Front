import React from 'react'

const Analytics = () => {
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between">
                            <div className="md:flex hidden md:flex-col flex-row justify-between items-start">
                                <h1 className="text-md font-semibold tracking-tight md:text-3xl">
                                    Analytics
                                </h1>
                                <p className="text-muted-foreground">Monitor user interactions   </p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics    