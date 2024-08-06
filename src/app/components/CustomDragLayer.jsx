import { useDragLayer } from 'react-dnd';
import Image from 'next/image';

const CustomDragLayer = ({ className }) => {
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
        <div className={`relative ${className}`}>
          <Image src={item.src} alt="" className="object-cover" fill />
        </div>
      </div>
    );
  }

  return null;
};

export default CustomDragLayer;
