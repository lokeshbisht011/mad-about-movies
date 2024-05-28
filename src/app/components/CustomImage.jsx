import Image from 'next/image';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const CustomImage = ({ src, index, moveImage }) => {
    const [, drag] = useDrag({
        type: 'IMAGE',
        item: { index },
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
        <div ref={(node) => drag(drop(node))} className='h-[150px] w-[350px] relative'>
            <Image src={src} alt="" className='object-cover' fill />
        </div>
    );
};

export default CustomImage;