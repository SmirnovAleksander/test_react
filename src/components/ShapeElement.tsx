import React, { useState, useEffect } from 'react';

interface ShapeElementProps {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    color: string;
    top: number;
    left: number;
    width: number;
    height: number;
    selected: boolean;
    onSelect: (id: number) => void;
    updatePosition: (id: number, top: number, left: number) => void;
    updateSize: (id: number, width: number, height: number) => void;
}

const ShapeElement: React.FC<ShapeElementProps> = ({
                                                       id,
                                                       type,
                                                       color,
                                                       top,
                                                       left,
                                                       width,
                                                       height,
                                                       selected,
                                                       onSelect,
                                                       updatePosition,
                                                       updateSize,
                                                   }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // Отключаем выделение
        onSelect(id);
        setIsDragging(true);
        setDragStart({ x: e.clientX - left, y: e.clientY - top });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(id, e.clientY - dragStart.y, e.clientX - dragStart.x);
        }
        if (isResizing) {
            let newWidth = width;
            let newHeight = height;

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
            updateSize(id, newWidth, newHeight);
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
        setResizeStart({ width, height, direction });
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


    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                top,
                left,
                width,
                height,
                backgroundColor: selected ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
                border: selected ? `2px solid blue` : 'none',
                cursor: isDragging ? 'move' : 'default',
                userSelect: 'none',
                pointerEvents: 'auto',
            }}
        >
            {type === 'rectangle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                    }}
                />
            )}
            {type === 'circle' && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        borderRadius: '50%',
                    }}
                />
            )}
            {type === 'line' && (
                <div
                    style={{
                        position: 'absolute',
                        top: height / 2,
                        left: 0,
                        width: width,
                        height: '2px',
                        backgroundColor: color,
                    }}
                />
            )}
            {selected && (
                <>
                    {/* Угловые маркеры */}
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'nwse-resize',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'nesw-resize',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'sw-resize',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'se-resize',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
                    ></div>

                    {/* Средние маркеры */}
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'n-resize',
                            transform: 'translateX(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 's-resize',
                            transform: 'translateX(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'e-resize',
                            transform: 'translateY(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                    ></div>
                    <div
                        className="resize-handle"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: 'w-resize',
                            transform: 'translateY(-50%)',
                        }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
                    ></div>
                </>
            )}
        </div>
    );
};

export default ShapeElement;
