import React, {useState, useEffect} from 'react';
import {selectElement, updateElement} from "../store/actions.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {ElementProps} from "../store/types.ts";

const useDragAndResize = (element : ElementProps) => {
    const dispatch: AppDispatch = useDispatch();

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    const slideWidth = 1000;
    const slideHeight = 1000;
    const updatePosition = (x: number, y: number) => {
        const newX = Math.max(0, Math.min(x, slideWidth - element.size.width));
        const newY = Math.max(0, Math.min(y, slideHeight - element.size.height));
        dispatch(updateElement(element.id, { position: { x: newX, y: newY }}));
    }
    const updateSize = (width: number, height: number) => {
        const newWidth = Math.min(Math.max(50, width), slideWidth - element.position.x);
        const newHeight = Math.min(Math.max(20, height), slideHeight - element.position.y);
        dispatch(updateElement(element.id, { size: { width: newWidth, height: newHeight } }));
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
        if (isResizing) {
            let newWidth = element.size.width;
            let newHeight = element.size.height;

            // Изменяем размеры в зависимости от направления
            if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + (e.clientX - dragStart.x));
            } else if (resizeStart.direction.includes('left')) {
                newWidth = Math.max(50, resizeStart.width - (e.clientX - dragStart.x));
            }
            if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + (e.clientY - dragStart.y));
            } else if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - (e.clientY - dragStart.y));
            }
            updateSize(newWidth, newHeight);
        }
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


    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizeStart({ width: element.size.width, height: element.size.height, direction });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - element.position.x, y: e.clientY - element.position.y });
        dispatch(selectElement(element.id))
    };


    return {
        isDragging,
        isResizing,
        handleMouseDown,
        handleResizeMouseDown,
        handleMouseUp,
    };
};

export default useDragAndResize;
