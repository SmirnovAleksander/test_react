import React, { useState, useEffect } from 'react';
import ResizeHandles from "../ResizeHandles.tsx";
import {AppDispatch, appState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectElement, updateElement} from "../../store/actions.ts";
import {ShapeElementProps} from "../../store/types.ts";

interface Props {
    id: number;
}

const ShapeElement: React.FC<Props> = ({id}) => {
    const dispatch : AppDispatch = useDispatch();
    // const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const element = useSelector((state: appState) =>
        state.elements.find(el => el.id === id)
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
    if (!['rectangle', 'circle', 'line'].includes(element.type)) return null;
    const { color, rotation, position, size, selected, lineWidth, borderRadius} = element as ShapeElementProps;

    const updatePosition = (x: number, y: number) => {
        dispatch(updateElement(element.id, { position: { x, y }}));
    }
    const updateSize = (width: number, height: number) => {
        dispatch(updateElement(element.id, { size: { width, height } }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // Отключаем выделение
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

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        e.preventDefault(); // Отключаем выделение
        setIsResizing(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizeStart({ width: size.width, height: size.height, direction });
    };

    return (
        <>
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    width: size.width,
                    height: size.height,
                    backgroundColor: selected ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
                    border: selected ? `2px solid blue` : 'none',
                    cursor: isDragging ? 'move' : 'default',
                    userSelect: 'none',
                    pointerEvents: 'auto',
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                {element.type === 'rectangle' && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: `${borderRadius}px`
                        }}
                    />
                )}
                {element.type === 'circle' && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: '50%',
                        }}
                    />
                )}
                {element.type === 'line' && (
                    <div
                        style={{
                            position: 'absolute',
                            top: size.height / 2,
                            left: 0,
                            width: size.width,
                            height: `${lineWidth}px`,
                            backgroundColor: color,
                        }}
                    />
                )}
                {selected && (<ResizeHandles onResizeStart={handleResizeMouseDown}/>)}
            </div>
        </>

    );
};

export default ShapeElement;
