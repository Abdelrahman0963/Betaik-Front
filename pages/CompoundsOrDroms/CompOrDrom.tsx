"use client"
import dynamic from 'next/dynamic'
const DormsMgt = dynamic(() => import('@/components/University/Droms/DromsMgt'), { ssr: false })
const CompOrDrom = () => {
    return (
        <>
            <DormsMgt />
        </>
    )
}

export default CompOrDrom
