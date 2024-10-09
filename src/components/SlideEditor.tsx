import React from 'react';
import '../App.css';
import TextElement from "./elements/TextElement.tsx";
import ElementList from "./ElementList.tsx";
import PropertiesPanel from "./PropertiesPanel.tsx";
import {ImageElementProps, ShapeElementProps, TextElementProps} from "../store/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../store/store.ts";
import {addElement} from "../store/actions.ts";
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";

const SlideEditor: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const elements = useSelector((state: appState) => state.elements);
    // const selectedElementId = useSelector((state: appState) => state.selectedElementId);

    const addTextElement = () => {
        const newTextElement : TextElementProps = {
            id: Date.now(),
            type: 'text',
            content: 'Новый текст',
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#d21',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 50 },
            rotation: 0,
            selected: true
        }
        dispatch(addElement(newTextElement))
    };
    const addImageElement = (imageUrl: string) => {
        const newImageElement: ImageElementProps = {
            id: Date.now(),
            type: 'image',
            content: imageUrl,
            position: { x: 150, y: 150 },
            size: { width: 100, height: 100 },
            rotation: 0,
            selected: true
        };
        dispatch(addElement(newImageElement));
    };
    const addShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        const newShapeElement: ShapeElementProps = {
            id: Date.now(),
            type,
            position: { x: 200, y: 200 },
            size: { width: 100, height: 100 },
            color: '#ff0000',
            rotation: 0,
            lineWidth: 2,
            borderRadius: 0,
            selected: true
        };
        dispatch(addElement(newShapeElement));
    };

    // const selectElement = (id: number) => {
    //     setSelectedElementId(id);
    // };

    // const slideWidth = 1000;
    // const slideHeight = 1000;
    //
    // const updateElementPosition = (id: number, x: number, y: number) => {
    //
    //     setElements(elements.map(el => {
    //         if (el.id === id) {
    //             const newX = Math.max(0, Math.min(x, slideWidth - el.size.width));
    //             const newY = Math.max(0, Math.min(y, slideHeight - el.size.height));
    //             return { ...el, position: { x: newX, y: newY } };
    //         }
    //         return el;
    //     }));
    // };
    // const updateElementSize = (id: number, width: number, height: number) => {
    //
    //     setElements(elements.map(el => {
    //         if (el.id === id) {
    //             const newWidth = Math.min(Math.max(50, width), slideWidth - el.position.x); // минимальный размер 50px
    //             const newHeight = Math.min(Math.max(20, height), slideHeight - el.position.y); // минимальный размер 20px
    //             return { ...el,  size: { width: newWidth, height: newHeight } };
    //         }
    //         return el;
    //     }));
    // };
    // const updateElementFontSize = (id: number, newFontSize: number) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, fontSize: newFontSize } : el));
    // };
    // const updateElementFontFamily = (id: number, newFontFamily: string) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, fontFamily: newFontFamily } : el));
    // };
    // const updateElementColor = (id: number, newColor: string) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, color: newColor } : el));
    // };
    // const updateElementContent = (id: number, newContent: string) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, content: newContent } : el));
    // };
    // const updateElementRotation = (id: number, newRotation: number) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, rotation: newRotation } : el));
    // };
    // const updateElementLineWidth = (id: number, newLineWidth: number) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, lineWidth: newLineWidth } : el));
    // };
    // const updateElementBorderRadius = (id: number, newBorderRadius: number) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, borderRadius: newBorderRadius } : el));
    // };
    //
    //
    // //для изменения размера текстового поля(не особо и нужно:D)
    // const handleTextChange = (id: number, newText: string) => {
    //     setElements(elements.map(el => el.id === id ? { ...el, content: newText } : el));
    // };
    // const autoResizeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     event.target.style.height = 'auto'; // Сброс высоты для пересчета
    //     event.target.style.height = `${event.target.scrollHeight}px`; // Задание новой высоты в зависимости от содержимого
    // };
    //
    // const deleteElement = (id: number) => {
    //     setElements(prevElements => prevElements.filter(element => element.id !== id));
    //     if (selectedElementId === id) {
    //         setSelectedElementId(null); // Сбрасываем выбранный элемент, если он был удален
    //     }
    // };

    // const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //     //Проверяем, если клик произошел на элементе
    //     const clickedOnElement = (e.target as HTMLElement).closest('.element');
    //     if (!clickedOnElement) {
    //         setSelectedElementId(null); // Сбросить выделение, если клик вне элемента
    //     }
    // };
    // const updateFunctions = {
    //     updateElementContent,
    //     autoResizeTextarea,
    //     updateElementPosition,
    //     updateElementSize,
    //     updateElementFontSize,
    //     updateElementFontFamily,
    //     updateElementColor,
    //     updateElementRotation,
    //     handleTextChange,
    //     updateElementLineWidth,
    //     updateElementBorderRadius
    // };

    return (
        <div className="slide-editor">
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
                <PropertiesPanel/>
            </div>
            <div className="slide">
                {elements.map(el => {
                    switch (el.type) {
                        case 'text':
                            return (
                                <TextElement
                                    key={el.id}
                                    id={el.id}
                                />
                            );
                        case 'image':
                            return (
                                <ImageElement
                                    key={el.id}
                                    id={el.id}
                                />
                            );
                        case 'rectangle':
                        case 'circle':
                        case 'line':
                            return (
                                <ShapeElement
                                    key={el.id}
                                    id={el.id}
                                />
                            );
                        default:
                            return null;
                    }
                })}

            </div>
            <div className="elements-list">
                <ElementList/>
            </div>
        </div>
    );
};

export default SlideEditor;
