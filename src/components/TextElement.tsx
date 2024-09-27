import React, {useState, useEffect, useRef} from 'react';
import ResizeHandles from "./ResizeHandles.tsx";

interface TextElementProps {
    id: number;
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    rotation: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    selected: boolean;
    onSelect: (id: number) => void;
    updatePosition: (id: number, top: number, left: number) => void;
    updateSize: (id: number, width: number, height: number) => void;
    updateElementContent: (id: number, newText: string) => void;
}

const TextElement: React.FC<TextElementProps> = ({
                                                     id,
                                                     text,
                                                     fontSize,
                                                     fontFamily,
                                                     color,
                                                     rotation,
                                                     position,
                                                     size,
                                                     selected,
                                                     onSelect,
                                                     updatePosition,
                                                     updateSize,
                                                     updateElementContent
                                                 }) => {

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    //для textarea
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(text); // Локальное состояние для редактируемого текста
    const inputRef = useRef<HTMLTextAreaElement>(null); // Реф для input

    const handleMouseDown = (e: React.MouseEvent) => {

        if (e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (!isEditing) {
            e.stopPropagation();
            e.preventDefault(); // Отключаем выделение
            onSelect(id);
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
     };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            updatePosition(id, e.clientX - dragStart.x, e.clientY - dragStart.y);
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
        setResizeStart({ width: size.width, height: size.height, direction });
    };

    //////для textarea
    const handleDoubleClick = () => {
        setIsEditing(true);
    };
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableText(e.target.value);
        updateElementContent(id, e.target.value);
    };
    const handleBlur = () => {
        setIsEditing(false);
        updateElementContent(id, editableText);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditing(false);
            updateElementContent(id, editableText);
        }
    };
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    /////


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
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
                position: 'absolute',
                border: selected ? '1px solid blue' : 'none',
                cursor: isDragging ? 'move' : 'default',
                userSelect: isEditing ? 'text' : 'none', // Отключает выделение текста
                color: `${color}`,
                transform: `rotate(${rotation}deg)`,
                fontSize: `${fontSize}px`,
                fontFamily: `${fontFamily}`,
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={editableText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        height: '100%',
                        fontSize: `${fontSize}px`,
                        fontFamily: `${fontFamily}`,
                        color: `${color}`,
                        transform: `rotate(${rotation}deg)`,
                        resize: 'none',
                        overflow: 'hidden',
                        border: 'none',
                        background: "transparent"
                    }}
                />
            ) : (
                <div>{text}</div>
            )}
            {selected && (<ResizeHandles onResizeStart={handleResizeMouseDown} />)}
        </div>
    );
};

export default TextElement;
