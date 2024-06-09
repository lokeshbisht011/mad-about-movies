import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const GameSection = ({ title, imageSrc, description, link, imageClass }) => {
    return (
        <section className="p-6 shadow-md rounded-lg text-center items-center justify-center bg-bgSoft">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className='flex justify-center items-center'>
                <div className={`relative border-2 border-green-500 ${imageClass}`}>
                    <Image src={imageSrc} alt={title} fill className='object-cover' />
                </div>
            </div>
            <p className="my-4">{description}</p>
            <Link href={link}>
                <span className="bg-button text-white px-4 py-2 rounded-md hover:bg-buttonHover">Play Now</span>
            </Link>
        </section>
    )
}

export default GameSection;