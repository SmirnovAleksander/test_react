import React, { useState } from 'react';
import './App.css';
import TextElement from "./components/TextElement.tsx";
import ImageElement from "./components/ImageElement.tsx";

interface ElementProps {
    id: number;
    type: 'text' | 'image';
    content: string; // для текста это текст, для изображения - путь к изображению
    top: number;
    left: number;
    width: number;
    height: number;
    rotate: number;
}

const SlideEditor: React.FC = () => {
    const [elements, setElements] = useState<ElementProps[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    const addTextElement = () => {
        setElements([...elements, {
            id: elements.length + 1,
            type: 'text',
            content: 'Новый текст',
            top: 100,
            left: 100,
            width: 200,
            height: 50,
            rotate: 0
        }]);
    };

    const addImageElement = (imageUrl: string) => {
        setElements([...elements, {
            id: elements.length + 1,
            type: 'image',
            content: imageUrl, // content - это путь к изображению
            top: 150,
            left: 150,
            width: 100,
            height: 100,
            rotate: 0
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

    const updateElementContent = (id: number, content: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, content } : el));
    };

    const selectedElement = elements.find(el => el.id === selectedElementId);

    return (
        <div className="slide-editor">
            <div className="toolbar">
                <button onClick={addTextElement}>Добавить текст</button>
                <button onClick={() => addImageElement('https://via.placeholder.com/150')}>Добавить изображение</button>
            </div>
            <div className="properties-panel">
                {selectedElement && (
                    <>
                        <h3>Параметры элемента</h3>
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
                        {selectedElement.type === 'text' && (
                            <div>
                                <label>Текст:</label>
                                <input
                                    type="text"
                                    value={selectedElement.content}
                                    onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="slide">
                {elements.map(el => (
                    el.type === 'text' ?
                        <TextElement
                            key={el.id}
                            id={el.id}
                            content={el.content}
                            top={el.top}
                            left={el.left}
                            width={el.width}
                            height={el.height}
                            selected={el.id === selectedElementId}
                            onSelect={selectElement}
                            updatePosition={updateElementPosition}
                            updateSize={updateElementSize}
                        />
                        :
                        <ImageElement
                            key={el.id}
                            id={el.id}
                            src={el.content} // content для изображения передаем как src
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
