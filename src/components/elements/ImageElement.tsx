import React, { useState, useEffect } from 'react';
import ResizeHandles from '../ResizeHandles.tsx';
import {AppDispatch, appState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ImageElementProps} from "../../store/types.ts";
import {selectElement, updateElement} from "../../store/actions.ts";

interface ImageProps {
    id: number;
}

const ImageElement: React.FC<ImageProps> = ({id}) => {

    const dispatch : AppDispatch = useDispatch();
    // const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const element = useSelector((state: appState) =>
        state.elements.find(el => el.id === id && el.type === "image")
    );

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

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

    if (!element) return null;
    if (element.type !== 'image') return null;
    const { rotation, position, size, selected, content} = element as ImageElementProps;


    const updatePosition = (x: number, y: number) => {
        dispatch(updateElement(element.id, { position: { x, y }}));
    }
    const updateSize = (width: number, height: number) => {
        dispatch(updateElement(element.id, { size: { width, height } }));
    };


    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        dispatch(selectElement(element.id))
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
        if (isResizing) {
            let newWidth = size.width;
            let newHeight = size.height;

            // Adjust size based on direction of resize
            if (resizeStart.direction.includes('left')) {
                newWidth = Math.max(50, resizeStart.width - (e.clientX - dragStart.x));
            } else if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + (e.clientX - dragStart.x));
            }
            if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - (e.clientY - dragStart.y));
            } else if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + (e.clientY - dragStart.y));
            }

            updateSize(newWidth, newHeight);
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
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizeStart({ width: size.width, height: size.height, direction });
    };

    return (
        <div
            className={`image-element ${selected ? 'selected' : ''}`}
            style={{
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
                position: 'absolute',
                border: selected ? '1px solid blue' : 'none',
                cursor: isDragging ? 'move' : 'default',
                transform: `rotate(${rotation}deg)`,
                userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
        >
            <img
                src={content}
                alt="Image"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            />
            {selected && <ResizeHandles onResizeStart={handleResizeMouseDown} />}
        </div>
    );
};

export default ImageElement;
