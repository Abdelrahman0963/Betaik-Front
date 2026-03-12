import Image from 'next/image'
import React from 'react'

const AuthPageImg = () => {
    return (
        <div className="w-full bg-[#155DFC] h-full relative">
            <div className="absolute top-[40%] left-[80%] 
translate-x-[-50%] translate-y-[-50%] 
w-50 h-0 
bg-white 
rounded-full 
blur-3xl 
pointer-events-none">
            </div>
            <Image src="/Group 1000001848.png" className='w-full h-full object-fill' alt="image" loading='lazy' quality={100} width={656} height={732} />

        </div>
    )
}

export default AuthPageImg
