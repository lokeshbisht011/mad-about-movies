import Image from 'next/image';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const CustomImage = ({ src, index, moveImage }) => {
    const [, drag] = useDrag({
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

    return (
        <div ref={(node) => drag(drop(node))} className='md:h-[150px] md:w-[350px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative'>
            <Image src={src} alt="" className='object-cover' fill />
        </div>
    );
};

export default CustomImage;