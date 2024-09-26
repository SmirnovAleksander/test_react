import React, { useState } from 'react';
import '../App.css';
import TextElement from "./TextElement.tsx";
import ImageElement from "./ImageElement.tsx";
import ShapeElement from "./ShapeElement.tsx";
import ElementList from "./ElementList.tsx";

interface TextElementProps {
    id: number;
    type: 'text';
    content: string; // Текстовое содержимое
    top: number;
    left: number;
    width: number;
    height: number;
    fontSize: number; // Размер шрифта
    fontFamily: string; // Шрифт
    color: string; // Цвет текста
    rotation: number;
}

interface ImageElementProps {
    id: number;
    type: 'image';
    content: string; // URL изображения
    top: number;
    left: number;
    width: number;
    height: number;
    rotation: number;
}

interface ShapeElementProps {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    top: number;
    left: number;
    width: number;
    height: number;
    color: string; // Цвет фигуры
    rotation: number;
}

// Объединенный интерфейс для элементов
type ElementProps = TextElementProps | ImageElementProps | ShapeElementProps;


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
            height: 50,
            rotation: 0,
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
            rotation: 0,
        }]);
    };

    const addShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        setElements([...elements, {
            id: elements.length + 1,
            type,
            top: 200,
            left: 200,
            width: 100,
            height: 100,
            color: '#ff0000',
            rotation: 0,
        }]);
    };

    const selectElement = (id: number) => {
        setSelectedElementId(id);
    };

    const updateElementPosition = (id: number, top: number, left: number) => {
        const slideWidth = 1000;
        const slideHeight = 1000;

        setElements(elements.map(el => {
            if (el.id === id) {
                const newLeft = Math.max(0, Math.min(left, slideWidth - el.width));
                const newTop = Math.max(0, Math.min(top, slideHeight - el.height));
                return { ...el, top: newTop, left: newLeft };
            }
            return el;
        }));
    };


    const updateElementSize = (id: number, width: number, height: number) => {
        const slideWidth = 1000;
        const slideHeight = 1000;

        setElements(elements.map(el => {
            if (el.id === id) {
                const newWidth = Math.min(Math.max(50, width), slideWidth - el.left); // минимальный размер 50px
                const newHeight = Math.min(Math.max(20, height), slideHeight - el.top); // минимальный размер 20px
                return { ...el, width: newWidth, height: newHeight };
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


    //для изменения размера текстового поля(не особо и нужно:D)
    const handleTextChange = (id: number, newText: string) => {
        setElements(elements.map(el => el.id === id ? { ...el, content: newText } : el));
    };
    const autoResizeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = 'auto'; // Сброс высоты для пересчета
        event.target.style.height = `${event.target.scrollHeight}px`; // Задание новой высоты в зависимости от содержимого
    };

    const updateRotation = (id: number, newRotation: number) => {
        setElements(elements.map(el => el.id === id ? { ...el, rotation: newRotation } : el));
    };

    const deleteElement = (id: number) => {
        setElements(prevElements => prevElements.filter(element => element.id !== id));
        if (selectedElementId === id) {
            setSelectedElementId(null); // Сбрасываем выбранный элемент, если он был удален
        }
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
                        <textarea
                            value={selectedElement.content}
                            onChange={(e) => {
                                handleTextChange(selectedElement.id, e.target.value);
                                autoResizeTextarea(e);  // Автоматическое изменение высоты
                            }}
                            style={{
                                width: '100%',
                                minHeight: '50px',
                                resize: 'none', // Отключаем возможность изменения размера пользователем
                                overflow: 'hidden', // Скролл скрываем
                            }}
                        />
                    </div>
                    <div>
                        <label>Угол поворота:</label>
                        <input
                            type="number"
                            value={selectedElement.rotation || 0}
                            onChange={(e) => {updateRotation(selectedElement.id, Number(e.target.value))}}
                        />
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <button onClick={() => {updateRotation(selectedElement.id, 0)}}>0°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 45)}}>45°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 90)}}>90°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 135)}}>135°</button>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <button onClick={() => {updateRotation(selectedElement.id, 180)}}>180°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 225)}}>225°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 270)}}>270°</button>
                        <button onClick={() => {updateRotation(selectedElement.id, 315)}}>315°</button>
                    </div>
                    <div>
                        <label>Поворот:</label>
                        <input
                            type="range"
                            min="0" // Минимальный угол поворота
                            max="360" // Максимальный угол поворота
                            value={selectedElement.rotation || 0}
                            onChange={(e) => {updateRotation(selectedElement.id, Number(e.target.value))}}
                        />
                        <span>{selectedElement.rotation || 0}°</span>
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
                    <div>
                        <label>Угол поворота:</label>
                        <input
                            type="number"
                            value={selectedElement.rotation || 0}
                            onChange={(e) => {
                                const newRotation = Number(e.target.value);
                                setElements(elements.map(el => el.id === selectedElement.id ? {
                                    ...el,
                                    rotation: newRotation
                                } : el));
                            }}
                        />
                    </div>
                </>
            );
        } else {
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
                        <label>Цвет текста:</label>
                        <input
                            type="color"
                            value={selectedElement.color}
                            onChange={(e) => updateElementColor(selectedElement.id, e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Угол поворота:</label>
                        <input
                            type="number"
                            value={selectedElement.rotation || 0}
                            onChange={(e) => {
                                const newRotation = Number(e.target.value);
                                setElements(elements.map(el => el.id === selectedElement.id ? {
                                    ...el,
                                    rotation: newRotation
                                } : el));
                            }}
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
                                    top={el.top}
                                    left={el.left}
                                    width={el.width}
                                    height={el.height}
                                    selected={el.id === selectedElementId}
                                    onSelect={selectElement}
                                    updatePosition={updateElementPosition}
                                    updateSize={updateElementSize}
                                />
                            );
                        case 'image':
                            return (
                                <ImageElement
                                    key={el.id}
                                    id={el.id}
                                    src={el.content}
                                    rotation={el.rotation}
                                    top={el.top}
                                    left={el.left}
                                    width={el.width}
                                    height={el.height}
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
                                    top={el.top}
                                    left={el.left}
                                    width={el.width}
                                    height={el.height}
                                    color={el.color!} // Убедитесь, что цвет задан
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
