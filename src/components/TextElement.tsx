import React, { useState, useEffect } from 'react';

interface TextElementProps {
    id: number;
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: boolean;
    onSelect: (id: number) => void;
    updatePosition: (id: number, x: number, y: number) => void;
    updateSize: (id: number, width: number, height: number) => void;
    updateFontSize: (id: number, fontSize: number) => void;
    updateFontFamily: (id: number, fontFamily: string) => void;
    updateColor: (id: number, color: number) => void;
}

const TextElement: React.FC<TextElementProps> = ({
                                                     id,
                                                     text,
                                                     fontSize,
                                                     fontFamily,
                                                     color,
                                                     x,
                                                     y,
                                                     width,
                                                     height,
                                                     selected,
                                                     onSelect,
                                                     updatePosition,
                                                     updateSize,
                                                     // updateFontSize,
                                                     // updateFontFamily,
                                                     // updateColor,
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
        setDragStart({ x: e.clientX - x, y: e.clientY - y });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(id, e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
        if (isResizing) {
            const widthChange = e.clientX - dragStart.x;
            const heightChange = e.clientY - dragStart.y;

            let newWidth = width;
            let newHeight = height;
            let newX = x;
            let newY = y;

            // Обработка изменения размера
            if (resizeStart.direction.includes('right')) {
                newWidth = Math.max(50, resizeStart.width + widthChange);
            } else if (resizeStart.direction.includes('left')) {
                newWidth = Math.max(50, resizeStart.width - widthChange);
                newX = x + (resizeStart.width - newWidth); // Перемещение элемента
            }
            if (resizeStart.direction.includes('bottom')) {
                newHeight = Math.max(20, resizeStart.height + heightChange);
            } else if (resizeStart.direction.includes('top')) {
                newHeight = Math.max(20, resizeStart.height - heightChange);
                newY = y + (resizeStart.height - newHeight); // Перемещение элемента
            }

            // Обновляем размеры и позицию
            updateSize(id, newWidth, newHeight);
            updatePosition(id, newX, newY);
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

    // const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newFontSize = parseInt(e.target.value, 10);
    //     updateFontSize(id, newFontSize);
    // };
    //
    // const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newFontFamily = e.target.value;
    //     updateFontFamily(id, newFontFamily);
    // };
    // const handleFontSizeChange = (newFontSize: number) => {
    //     updateFontSize(id, newFontSize);
    // };
    //
    // // Update font family and notify parent component
    // const handleFontFamilyChange = (newFontFamily: string) => {
    //     updateFontFamily(id, newFontFamily);
    // };
    //
    // // Update color and notify parent component
    // const handleColorChange = (newColor: string) => {
    //     updateColor(id, newColor);
    // };

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
            className={`text-element ${selected ? 'selected' : ''}`}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
                border: selected ? '1px solid blue' : 'none',
                cursor: isDragging ? 'move' : 'default',
                userSelect: 'none',
                color: `${color}`,
                fontSize: `${fontSize}px`,
                fontFamily: `${fontFamily}`,
            }}
            onMouseDown={handleMouseDown}
        >
            <div>{text}</div>
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

export default TextElement;
