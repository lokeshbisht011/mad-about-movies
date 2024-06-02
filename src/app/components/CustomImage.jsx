import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const CustomImage = ({ src, index, moveImage }) => {
    const [, drag, preview] = useDrag({
        type: 'IMAGE',
        item: { index, src },
    });

    const [, drop] = useDrop({
        accept: 'IMAGE',
        hover: (item) => {
            if (item.index !== index) {
                moveImage(item.index, index);
                item.index = index;
            }
        },
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div ref={(node) => drag(drop(node))} className='md:h-[150px] md:w-[350px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative border-4 border-gray-500'>
            {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <Image src={src} alt="" className='object-cover' fill layout='fill' onLoad={handleImageLoad} />
        </div>
    );
};

export default CustomImage;