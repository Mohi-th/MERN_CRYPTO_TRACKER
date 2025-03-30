import React from 'react'
import Slider from './Slider'

function BannerSection() {
    return (
        <section className={'bg-[url(https://crypto-hunter.netlify.app/banner2.jpg)] w-full flex pb-10 gap-15 flex-col justify-center items-center pt-18'} >
            <div>
                <h1 className='text-6xl text-white font-bold'>
                Crypto Hunter
            </h1>
            <p className='text-gray-400 mt-4'>
                Get all the Info regarding your favorite Crypto Currency
            </p>
            </div>
            <Slider/>
        </section>
    )
}

export default BannerSection
