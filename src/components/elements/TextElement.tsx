import React, {useState, useEffect, useRef} from 'react';
import ResizeHandles from "../ResizeHandles.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../../store/store.ts";
import {selectElement, updateElement} from "../../store/actions.ts";

interface Props {
    id: number;
}

const TextElement: React.FC<Props> = ({id}) => {
    const dispatch : AppDispatch = useDispatch();
    // const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const element = useSelector((state: appState) =>
        state.elements.find(el => el.id === id && el.type === "text")
    );

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, direction: '' });

    //для textarea
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(''); // Локальное состояние для редактируемого текста
    const inputRef = useRef<HTMLTextAreaElement>(null); // Реф для input

    const handleDoubleClick = () => {
        setIsEditing(true);
    };
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableText(e.target.value);
        updateElementContent(e.target.value);
    };
    const handleBlur = () => {
        setIsEditing(false);
        updateElementContent(editableText);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsEditing(false);
            updateElementContent(editableText);
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

    if (!element) return null;
    if (element.type !== 'text') return null;
    const { content, fontSize, fontFamily, color, rotation, position, size, selected } = element;

    const updatePosition = (x: number, y: number) => {
        dispatch(updateElement(element.id, { position: { x, y }}));
    }
    const updateSize = (width: number, height: number) => {
        dispatch(updateElement(element.id, { size: { width, height } }));
    };
    const updateElementContent = (newText: string) => {
        dispatch(updateElement(element.id, { content: newText }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (!isEditing) {
            e.stopPropagation();
            e.preventDefault(); // Отключаем выделение
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
            dispatch(selectElement(element.id))
        }
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
                <div>{content}</div>
            )}
            {selected && (<ResizeHandles onResizeStart={handleResizeMouseDown} />)}
        </div>
    );
};

export default TextElement;
