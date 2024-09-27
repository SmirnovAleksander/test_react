import React, { useState } from 'react';
import '../App.css';
import TextElement from "./TextElement.tsx";
import ImageElement from "./ImageElement.tsx";
import ShapeElement from "./ShapeElement.tsx";
import ElementList from "./ElementList.tsx";
import PropertiesPanel from "./PropertiesPanel.tsx";
import {ElementProps} from "./types.ts";

const SlideEditor: React.FC = () => {
    const [elements, setElements] = useState<ElementProps[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    const addTextElement = () => {
        setElements([...elements, {
            id: elements.length + 1,
            type: 'text',
            content: 'Новый текст',
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#d21',
            position: { x: 100, y: 100 }, // Используем position
            size: { width: 200, height: 50 }, // Используем size
            rotation: 0,
        }]);
    };
    const addImageElement = (imageUrl: string) => {
        setElements([...elements, {
            id: elements.length + 1,
            type: 'image',
            content: imageUrl,
            position: { x: 150, y: 150 }, // Используем position
            size: { width: 100, height: 100 }, // Используем size
            rotation: 0,
        }]);
    };
    const addShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        setElements([...elements, {
            id: elements.length + 1,
            type,
            position: { x: 200, y: 200 }, // Используем position
            size: { width: 100, height: 100 }, // Используем size
            color: '#ff0000',
            rotation: 0,
            lineWidth: 2,
        }]);
    };


    const selectElement = (id: number) => {
        setSelectedElementId(id);
    };

    const updateElementPosition = (id: number, x: number, y: number) => {
        const slideWidth = 1000;
        const slideHeight = 1000;

        setElements(elements.map(el => {
            if (el.id === id) {
                const newX = Math.max(0, Math.min(x, slideWidth - el.size.width));
                const newY = Math.max(0, Math.min(y, slideHeight - el.size.height));
                return { ...el, position: { x: newX, y: newY } };
            }
            return el;
        }));
    };


    const updateElementSize = (id: number, width: number, height: number) => {
        const slideWidth = 1000;
        const slideHeight = 1000;

        setElements(elements.map(el => {
            if (el.id === id) {
                const newWidth = Math.min(Math.max(50, width), slideWidth - el.position.x); // минимальный размер 50px
                const newHeight = Math.min(Math.max(20, height), slideHeight - el.position.y); // минимальный размер 20px
                return { ...el,  size: { width: newWidth, height: newHeight } };
            }
            return el;
        }));
    };

    const updateElementFontSize = (id: number, fontSize: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, fontSize } : el));
    };
    const updateElementFontFamily = (id: number, fontFamily: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, fontFamily } : el));
    };
    const updateElementColor = (id: number, color: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, color } : el));
    };
    const updateElementContent = (id: number, content: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, content } : el));
    };
    const updateRotation = (id: number, newRotation: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, rotation: newRotation } : el));
    };
    const updateLineWidth = (id: number, newLineWidth: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, lineWidth: newLineWidth } : el));
    };

    //для изменения размера текстового поля(не особо и нужно:D)
    const handleTextChange = (id: number, newText: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, content: newText } : el));
    };
    const autoResizeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = 'auto'; // Сброс высоты для пересчета
        event.target.style.height = `${event.target.scrollHeight}px`; // Задание новой высоты в зависимости от содержимого
    };

    const deleteElement = (id: number) => {
        setElements(prevElements => prevElements.filter(element => element.id !== id));
        if (selectedElementId === id) {
            setSelectedElementId(null); // Сбрасываем выбранный элемент, если он был удален
        }
    };

    // const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //     //Проверяем, если клик произошел на элементе
    //     const clickedOnElement = (e.target as HTMLElement).closest('.element');
    //     if (!clickedOnElement) {
    //         setSelectedElementId(null); // Сбросить выделение, если клик вне элемента
    //     }
    // };

    const renderPropertiesPanel = () => {
        const selectedElement = elements.find(el => el.id === selectedElementId);

        return (
            <PropertiesPanel
                selectedElement={selectedElement!}
                updateElementContent={updateElementContent}
                autoResizeTextarea={autoResizeTextarea}
                updateElementPosition={updateElementPosition}
                updateElementSize={updateElementSize}
                updateElementFontSize={updateElementFontSize}
                updateElementFontFamily={updateElementFontFamily}
                updateElementColor={updateElementColor}
                updateRotation={updateRotation}
                handleTextChange={handleTextChange}
                updateLineWidth={updateLineWidth}
            />
        )

    };

    return (
        <div className="slide-editor"
             // onMouseDown={handleEditorClick}
        >
            <div className="toolbar">
                <button onClick={addTextElement}>Добавить текст</button>
                <button
                    onClick={() => addImageElement('https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200')}>Добавить
                    изображение
                </button>
                <button onClick={() => addShapeElement('rectangle')}>Добавить прямоугольник</button>
                <button onClick={() => addShapeElement('circle')}>Добавить круг</button>
                <button onClick={() => addShapeElement('line')}>Добавить линию</button>
            </div>
            <div className="properties-panel">
                {renderPropertiesPanel()}
            </div>
            <div className="slide">
                {elements.map(el => {
                    switch (el.type) {
                        case 'text':
                            return (
                                <TextElement
                                    key={el.id}
                                    id={el.id}
                                    text={el.content}
                                    fontSize={el.fontSize}
                                    fontFamily={el.fontFamily}
                                    color={el.color}
                                    rotation={el.rotation}
                                    position={el.position}
                                    size={el.size}
                                    selected={el.id === selectedElementId}
                                    onSelect={selectElement}
                                    updatePosition={updateElementPosition}
                                    updateSize={updateElementSize}
                                    updateElementContent={updateElementContent}
                                />
                            );
                        case 'image':
                            return (
                                <ImageElement
                                    key={el.id}
                                    id={el.id}
                                    src={el.content}
                                    rotation={el.rotation}
                                    position={el.position}
                                    size={el.size}
                                    selected={el.id === selectedElementId}
                                    onSelect={selectElement}
                                    updatePosition={updateElementPosition}
                                    updateSize={updateElementSize}
                                />
                            );
                        case 'rectangle':
                        case 'circle':
                        case 'line':
                            return (
                                <ShapeElement
                                    key={el.id}
                                    id={el.id}
                                    type={el.type}
                                    rotation={el.rotation}
                                    lineWidth={el.lineWidth!}
                                    position={el.position}
                                    size={el.size}
                                    color={el.color!}
                                    selected={el.id === selectedElementId}
                                    onSelect={selectElement}
                                    updatePosition={updateElementPosition}
                                    updateSize={updateElementSize}
                                />
                            );
                        // Добавьте дополнительные case для других типов элементов, если необходимо
                        default:
                            return null; // На случай, если тип элемента не поддерживается
                    }
                })}

            </div>
            <div className="elements-list">
                <ElementList
                    elements={elements}
                    selectedElementId={selectedElementId}
                    onSelectElement={selectElement}
                    onDeleteElement={deleteElement}
                />
            </div>
        </div>
    );
};

export default SlideEditor;
