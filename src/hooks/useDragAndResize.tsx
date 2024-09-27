import React, {useState, useEffect, useRef} from 'react';

interface UseDragAndResizeProps {
    id: number;
    position: {x: number; y: number };
    size: {width: number; height: number };
    updatePosition: (id: number, x: number, y: number) => void;
    updateSize: (id: number, width: number, height: number) => void;
    onSelect: (id: number) => void;
}

const useDragAndResize = ({
                              id,
                              position,
                              size,
                              updatePosition,
                              updateSize,
                              onSelect
                          }: UseDragAndResizeProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ width: 0, height: 0, direction: '' });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onSelect(id);
        setIsDragging(true);
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(id, e.clientX - dragStart.current.x, e.clientY - dragStart.current.y);
        }
        if (isResizing) {
            const { width, height, direction } = resizeStart.current;
            let newWidth = size.width;
            let newHeight = size.height;

            // Adjust size based on direction of resize
            if (direction.includes('left')) {
                newWidth = Math.max(50, width - (e.clientX - dragStart.current.x));
            } else if (direction.includes('right')) {
                newWidth = Math.max(50, width + (e.clientX - dragStart.current.x));
            }
            if (direction.includes('top')) {
                newHeight = Math.max(20, height - (e.clientY - dragStart.current.y));
            } else if (direction.includes('bottom')) {
                newHeight = Math.max(20, height + (e.clientY - dragStart.current.y));
            }

            updateSize(id, newWidth, newHeight);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        resizeStart.current = { width: size.width, height: size.height, direction };
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    return {
        isDragging,
        handleMouseDown,
        handleResizeMouseDown,
    };
};

export default useDragAndResize;
