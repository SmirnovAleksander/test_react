import React from 'react';
import '../App.css';
import TextElement from "./elements/TextElement.tsx";
import {ImageElementProps, ShapeElementProps, TextElementProps} from "../store/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, appState} from "../store/store.ts";
import {addElement, deselectElement} from "../store/actions.ts";
import ShapeElement from "./elements/ShapeElement.tsx";
import ImageElement from "./elements/ImageElement.tsx";

const SlideEditor: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const elements = useSelector((state: appState) => state.elements);

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
        }
        dispatch(addElement(newTextElement))
    };
    const addImageElement = () => {
        const imageUrl = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';
        const newImageElement: ImageElementProps = {
            id: Date.now(),
            type: 'image',
            content: imageUrl,
            position: { x: 150, y: 150 },
            size: { width: 100, height: 100 },
            rotation: 0,
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
        };
        dispatch(addElement(newShapeElement));
    };

    const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedOnElement = (e.target as HTMLElement).closest('.element');
        if (!clickedOnElement) {
            dispatch(deselectElement());
        }
    };

    return (
        <div className="slide-editor">
            <div className="toolbar">
                <button onClick={addTextElement}>Добавить текст</button>
                <button onClick={addImageElement}>Добавить изображение</button>
                <button onClick={() => addShapeElement('rectangle')}>Добавить прямоугольник</button>
                <button onClick={() => addShapeElement('circle')}>Добавить круг</button>
                <button onClick={() => addShapeElement('line')}>Добавить линию</button>
            </div>
            <div className="slide" onMouseDown={handleEditorClick}>
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
        </div>
    );
};

export default SlideEditor;
