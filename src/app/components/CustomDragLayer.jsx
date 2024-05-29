// components/CustomDragLayer.js
import { useDragLayer } from 'react-dnd';
import Image from 'next/image';

const CustomDragLayer = () => {
  const { item, itemType, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    left: currentOffset.x,
    top: currentOffset.y,
    zIndex: 100,
  };

  if (itemType === 'IMAGE') {
    return (
      <div style={layerStyles}>
        <div className="md:h-[150px] md:w-[350px] sm:h-[120px] sm:w-[300px] h-[80px] w-[190px] relative">
          <Image src={item.src} alt="" className="object-cover" fill />
        </div>
      </div>
    );
  }

  return null;
};

export default CustomDragLayer;
