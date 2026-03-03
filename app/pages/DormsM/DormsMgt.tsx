import React from 'react'

const DormsMgt = () => {
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
                            <div className="flex flex-col  justify-between  items-start">
                                <h1 className="text-md font-semibold  tracking-tight md:text-3xl">Dorms Management</h1>
                                <p className="text-muted-foreground">Manage all payment plans and special offers for your dorms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DormsMgt
