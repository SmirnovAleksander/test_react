import React, { useState } from 'react';
import './App.css';
import TextElement from "./components/TextElement.tsx";
import ImageElement from "./components/ImageElement.tsx";


interface ElementProps {
    id: number;
    type: 'text' | 'image';
    content: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    top: number;
    left: number;
    width: number;
    height: number;
}

const availableFonts = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Comic Sans MS',
    'Tahoma',
    'Trebuchet MS',
];

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
            top: 100,
            left: 100,
            width: 200,
            height: 50
        }]);
    };

    const addImageElement = (imageUrl: string) => {
        setElements([...elements, {
            id: elements.length + 1,
            type: 'image',
            content: imageUrl,
            top: 150,
            left: 150,
            width: 100,
            height: 100,
        }]);
    };

    const selectElement = (id: number) => {
        setSelectedElementId(id);
    };

    const updateElementPosition = (id: number, top: number, left: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, top, left } : el));
    };

    const updateElementSize = (id: number, width: number, height: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, width, height } : el));
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

    const renderPropertiesPanel = () => {
        const selectedElement = elements.find(el => el.id === selectedElementId);

        if (!selectedElement) return null;

        if (selectedElement.type === 'text') {
            return (
                <>
                    <h3>Параметры текстового элемента</h3>
                    <div>
                        <label>Положение Y:</label>
                        <input
                            type="number"
                            value={selectedElement.top}
                            onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.left)}
                        />
                    </div>
                    <div>
                        <label>Положение X:</label>
                        <input
                            type="number"
                            value={selectedElement.left}
                            onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.top, Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Ширина:</label>
                        <input
                            type="number"
                            value={selectedElement.width}
                            onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.height)}
                        />
                    </div>
                    <div>
                        <label>Высота:</label>
                        <input
                            type="number"
                            value={selectedElement.height}
                            onChange={(e) => updateElementSize(selectedElement.id, selectedElement.width, Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Размер шрифта:</label>
                        <input
                            type="number"
                            value={selectedElement.fontSize || ''}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '') {
                                    return;
                                }
                                updateElementFontSize(selectedElement.id, Number(newValue));
                            }}
                        />
                    </div>
                    <div>
                        <label>Шрифт:</label>
                        <select
                            value={selectedElement.fontFamily}
                            onChange={(e) => updateElementFontFamily(selectedElement.id, e.target.value)}
                        >
                            {availableFonts.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Цвет текста:</label>
                        <input
                            type="color"
                            value={selectedElement.color}
                            onChange={(e) => updateElementColor(selectedElement.id, e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Текст:</label>
                        <input
                            type="text"
                            value={selectedElement.content}
                            onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
                        />
                    </div>
                </>
            );
        } else if (selectedElement.type === 'image') {
            return (
                <>
                    <h3>Параметры изображенческого элемента</h3>
                    <div>
                        <label>Положение Y:</label>
                        <input
                            type="number"
                            value={selectedElement.top}
                            onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.left)}
                        />
                    </div>
                    <div>
                        <label>Положение X:</label>
                        <input
                            type="number"
                            value={selectedElement.left}
                            onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.top, Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Ширина:</label>
                        <input
                            type="number"
                            value={selectedElement.width}
                            onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.height)}
                        />
                    </div>
                    <div>
                        <label>Высота:</label>
                        <input
                            type="number"
                            value={selectedElement.height}
                            onChange={(e) => updateElementSize(selectedElement.id, selectedElement.width, Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>URL изображения:</label>
                        <input
                            type="text"
                            value={selectedElement.content}
                            onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
                        />
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="slide-editor">
            <div className="toolbar">
                <button onClick={addTextElement}>Добавить текст</button>
                <button
                    onClick={() => addImageElement('https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200')}>Добавить
                    изображение
                </button>
            </div>
            <div className="properties-panel">
                {renderPropertiesPanel()}
            </div>
            <div className="slide">
                {elements.map(el => (
                    el.type === 'text' ?
                        <TextElement
                            key={el.id}
                            id={el.id}
                            text={el.content}
                            fontSize={el.fontSize}
                            fontFamily={el.fontFamily}
                            color={el.color}
                            top={el.top}
                            left={el.left}
                            width={el.width}
                            height={el.height}
                            selected={el.id === selectedElementId}
                            onSelect={selectElement}
                            updatePosition={updateElementPosition}
                            updateSize={updateElementSize}
                        /> :
                        <ImageElement
                            key={el.id}
                            id={el.id}
                            src={el.content}
                            top={el.top}
                            left={el.left}
                            width={el.width}
                            height={el.height}
                            selected={el.id === selectedElementId}
                            onSelect={selectElement}
                            updatePosition={updateElementPosition}
                            updateSize={updateElementSize}
                        />
                ))}
            </div>
        </div>
    );
};

export default SlideEditor;
