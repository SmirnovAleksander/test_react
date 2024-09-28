import React from "react";
import {ElementProps} from "./types.ts";

interface PropertiesPanelProps {
    selectedElement:  ElementProps | null;
    updateFunctions: {
        updateElementPosition: (id: number, top: number, left: number) => void;
        updateElementSize: (id: number, width: number, height: number) => void;
        updateElementFontSize: (id: number, fontSize: number) => void;
        updateElementFontFamily: (id: number, fontFamily: string) => void;
        updateElementColor: (id: number, color: string) => void;
        updateRotation: (id: number, rotation: number) => void;
        handleTextChange: (id: number, text: string) => void;
        updateLineWidth: (id: number, lineWidth: number) => void;
        updateBorderRadius: (id: number, borderRadius: number) => void;
        autoResizeTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        updateElementContent: (id: number, content: string) => void;
    };
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

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
                                                             selectedElement,
                                                             updateFunctions}) => {
    const {
        updateElementContent,
        autoResizeTextarea,
        updateElementPosition,
        updateElementSize,
        updateElementFontSize,
        updateElementFontFamily,
        updateElementColor,
        updateRotation,
        updateBorderRadius,
        handleTextChange,
        updateLineWidth,
    } = updateFunctions;

    if (!selectedElement) return null;

    if (selectedElement.type === 'text') {
        return (
            <>
                <h3>Параметры текстового элемента</h3>
                <div>
                    <label>Id: </label>
                    {selectedElement.id}
                </div>
                <div>
                    <label>Положение Y:</label>
                    <input
                        type="number"
                        value={selectedElement.position.y}
                        onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.position.x)}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.position.y, Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.size.height)}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElementSize(selectedElement.id, selectedElement.size.width, Number(e.target.value))}
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
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 315)
                    }}>315°
                    </button>
                </div>
                <div>
                    <label>Поворот:</label>
                    <input
                        type="range"
                        min="0" // Минимальный угол поворота
                        max="360" // Максимальный угол поворота
                        value={selectedElement.rotation || 0}
                        onChange={(e) => {
                            updateRotation(selectedElement.id, Number(e.target.value))
                        }}
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
                    <label>Id: </label>
                    {selectedElement.id}
                </div>
                <div>
                    <label>Положение Y:</label>
                    <input
                        type="number"
                        value={selectedElement.position.y}
                        onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.position.x)}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.position.y, Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.size.height)}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElementSize(selectedElement.id, selectedElement.size.width, Number(e.target.value))}
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
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 315)
                    }}>315°
                    </button>
                </div>
                <div>
                    <label>Поворот:</label>
                    <input
                        type="range"
                        min="0" // Минимальный угол поворота
                        max="360" // Максимальный угол поворота
                        value={selectedElement.rotation || 0}
                        onChange={(e) => {
                            updateRotation(selectedElement.id, Number(e.target.value))
                        }}
                    />
                    <span>{selectedElement.rotation || 0}°</span>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h3>Параметры изображенческого элемента</h3>
                <div>
                    <label>Id: </label>
                    {selectedElement.id}
                </div>
                <div>
                <label>Положение Y:</label>
                    <input
                        type="number"
                        value={selectedElement.position.y}
                        onChange={(e) => updateElementPosition(selectedElement.id, Number(e.target.value), selectedElement.position.x)}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.position.y, Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElementSize(selectedElement.id, Number(e.target.value), selectedElement.size.height)}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElementSize(selectedElement.id, selectedElement.size.width, Number(e.target.value))}
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
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(selectedElement.id, 315)
                    }}>315°
                    </button>
                </div>
                <div>
                    <label>Поворот:</label>
                    <input
                        type="range"
                        min="0" // Минимальный угол поворота
                        max="360" // Максимальный угол поворота
                        value={selectedElement.rotation || 0}
                        onChange={(e) => {
                            updateRotation(selectedElement.id, Number(e.target.value))
                        }}
                    />
                    <span>{selectedElement.rotation || 0}°</span>
                </div>
                {selectedElement.type === 'line' ? <div>
                    <label>Толщина линии:</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={selectedElement.lineWidth || 2}
                        onChange={(e) => {
                            updateLineWidth(selectedElement.id, Number(e.target.value))
                        }}
                    />
                    <span>{selectedElement.lineWidth || 2}°</span>
                </div> : <div></div>}
                {selectedElement.type === 'rectangle' ? <div>
                    <label>Радиус закругления: </label>
                    <input
                        type="range"
                        min="2"
                        max="100"
                        value={selectedElement.borderRadius || 0}
                        onChange={(e) => {
                            updateBorderRadius(selectedElement.id, Number(e.target.value))
                        }}
                    />
                    <span>{selectedElement.borderRadius || 0}°</span>
                </div> : <div></div>}
            </>
        );
    }
    return null;
};

export default PropertiesPanel;