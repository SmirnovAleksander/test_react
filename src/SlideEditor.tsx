import React, { useState } from 'react';
import './App.css';
import TextElement from "./components/TextElement.tsx";
// import ImageElement from "./components/ImageElement.tsx";

interface TextField {
    id: number;
    text: string;
    fontSize: number;
    fontFamily: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
}

interface ImageField {
    id: number;
    url: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

const SlideEditor: React.FC = () => {
    const [elements, setElements] = useState<(TextField | ImageField)[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    const addTextElement = () => {
        const newTextElement: TextField = {
            id: elements.length + 1,
            text: 'Новый текст',
            fontSize: 16,
            fontFamily: 'Arial',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 50 },
            color: '#dd2'
        };
        setElements([...elements, newTextElement]);
    };

    const addImageElement = (imageUrl: string) => {
        const newImageElement: ImageField = {
            id: elements.length + 1,
            url: imageUrl,
            position: { x: 150, y: 150 },
            size: { width: 100, height: 100 }
        };
        setElements([...elements, newImageElement]);
    };

    const selectElement = (id: number) => {
        setSelectedElementId(id);
    };

    const updateElementPosition = (id: number, x: number, y: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, position: { x, y } } : el));
    };

    const updateElementSize = (id: number, width: number, height: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, size: { width, height } } : el));
    };

    const updateElementText = (id: number, text: string) => {
        setElements(elements.map(el => el.id === id && 'text' in el ? { ...el, text } : el));
    };

    const updateElementFontSize = (id: number, fontSize: number) => {
        setElements(elements.map(el => el.id === id && 'fontSize' in el ? { ...el, fontSize } : el));
    };

    const updateElementFontFamily = (id: number, fontFamily: string) => {
        setElements(elements.map(el => el.id === id && 'fontFamily' in el ? { ...el, fontFamily } : el));
    };

    const updateElementColor = (id: number, color: string) => {
        setElements(elements.map(el => el.id === id && 'color' in el ? { ...el, color } : el));
    };

    const selectedElement = elements.find(el => el.id === selectedElementId);

    return (
        <div className="slide-editor">
            <div className="toolbar">
                <button onClick={addTextElement}>Добавить текст</button>
                <button onClick={() => addImageElement('https://via.placeholder.com/150')}>Добавить изображение</button>
            </div>
            <div className="slide">
                {elements.map(el => (
                    'text' in el ?
                        <TextElement
                            key={el.id}
                            id={el.id}
                            text={el.text}
                            fontSize={el.fontSize}
                            fontFamily={el.fontFamily}
                            color={el.color}
                            x={el.position.x}
                            y={el.position.y}
                            width={el.size.width}
                            height={el.size.height}
                            selected={el.id === selectedElementId}
                            onSelect={selectElement}
                            updatePosition={updateElementPosition}
                            updateSize={updateElementSize}
                            updateFontSize={updateElementFontSize}
                            updateFontFamily={updateElementFontFamily}
                            updateColor={updateElementColor}
                        />
                        // :
                        // <ImageElement
                        //     key={el.id}
                        //     id={el.id}
                        //     url={el.url}
                        //     x={el.position.x}
                        //     y={el.position.y}
                        //     width={el.size.width}
                        //     height={el.size.height}
                        //     selected={el.id === selectedElementId}
                        //     onSelect={selectElement}
                        //     updatePosition={updateElementPosition}
                        //     updateSize={updateElementSize}
                        // />
                    : <div></div>
                ))}
            </div>

            {/* Панель редактирования для выбранного текстового элемента */}
            {selectedElement && 'text' in selectedElement && (
                <div className="properties-panel">
                    <h3>Изменение текста</h3>
                    <label>Текст:</label>
                    <input
                        type="text"
                        value={selectedElement.text}
                        onChange={(e) => updateElementText(selectedElement.id, e.target.value)}
                    />
                    <br />
                    <label>Размер шрифта:</label>
                    <input
                        type="number"
                        value={selectedElement.fontSize}
                        onChange={(e) => updateElementFontSize(selectedElement.id, Number(e.target.value))}
                    />
                    <br />
                    <label>Шрифт:</label>
                    <input
                        type="text"
                        value={selectedElement.fontFamily}
                        onChange={(e) => updateElementFontFamily(selectedElement.id, e.target.value)}
                    />
                    <br />
                    <label>Цвет текста:</label>
                    <input
                        type="color"
                        value={selectedElement.color}
                        onChange={(e) => updateElementColor(selectedElement.id, e.target.value)}
                    />
                    <br />
                    <h4>Позиция</h4>
                    <label>X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.position.y)}
                    />
                    <br />
                    <label>Y:</label>
                    <input
                        type="number"
                        value={selectedElement.position.y}
                        onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.position.x, Number(e.target.value))}
                    />
                    <br />
                    <h4>Размеры</h4>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.size.height)}
                    />
                    <br />
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElementSize(selectedElement.id, selectedElement.size.width, Number(e.target.value))}
                    />
                </div>
            )}
        </div>
    );
};

export default SlideEditor;
