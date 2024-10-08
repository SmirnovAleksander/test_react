import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateElement} from "../store/actions.ts";
import {AppDispatch, appState} from "../store/store.ts";

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

const PropertiesPanel: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const selectedElementId = useSelector((state: appState) => state.selectedElementId);
    const elements = useSelector((state: appState) => state.elements);
    const selectedElement = elements.find(el => el.id === selectedElementId);

    const updatePosition = (top: number, left: number) => {
        dispatch(updateElement(selectedElement!.id, { position: { x: left, y: top } }));
    };
    const updateSize = (width: number, height: number) => {
        dispatch(updateElement(selectedElement!.id, { size: { width, height } }));
    };
    const updateFontSize = (fontSize: number) => {
        dispatch(updateElement(selectedElement!.id, { fontSize }));
    };
    const updateFontFamily = (fontFamily: string) => {
        dispatch(updateElement(selectedElement!.id, { fontFamily }));
    };
    const updateColor = (color: string) => {
        dispatch(updateElement(selectedElement!.id, { color }));
    };
    const updateContent = (text: string) => {
        dispatch(updateElement(selectedElement!.id, { content: text }));
    };
    const updateRotation = (rotation: number) => {
        dispatch(updateElement(selectedElement!.id, { rotation }));
    };

    const updateLineWidth = (lineWidth: number) => {
        dispatch(updateElement(selectedElement!.id, { lineWidth }));
    };

    const updateBorderRadius = (borderRadius: number) => {
        dispatch(updateElement(selectedElement!.id, { borderRadius }));
    };



    if (!selectedElement) {
        // return <div>Выберите элемент, чтобы отредактировать его свойства.</div>;
        return null;
    }

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
                        onChange={(e) => {
                            updatePosition(selectedElement.position.x, Number(e.target.value))
                        }}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => {
                            updatePosition(Number(e.target.value), selectedElement.position.y)
                    }}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => {
                            updateSize(Number(e.target.value), selectedElement.size.height)
                        }}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => {
                            updateSize(selectedElement.size.width, Number(e.target.value))
                        }}
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
                            updateFontSize(Number(newValue))
                        }}
                    />
                </div>
                <div>
                    <label>Шрифт:</label>
                    <select
                        value={selectedElement.fontFamily}
                        onChange={(e) => {
                            updateFontFamily(e.target.value)
                        }}
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
                        onChange={(e) => {
                            updateColor(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label>Текст:</label>
                    <textarea
                        value={selectedElement.content}
                        onChange={(e) => {
                            // handleTextChange(selectedElement.id, e.target.value);
                            // autoResizeTextarea(e);  // Автоматическое изменение высоты
                            updateContent(e.target.value)
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
                        updateRotation(0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(315)
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
                            updateRotation(Number(e.target.value))
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
                        onChange={(e) => {
                            updatePosition(selectedElement.position.x, Number(e.target.value))
                        }}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => {
                            updatePosition(Number(e.target.value), selectedElement.position.y)
                        }}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => {
                            updateSize(Number(e.target.value), selectedElement.size.height)
                        }}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => {
                            updateSize(selectedElement.size.width, Number(e.target.value))
                        }}
                    />
                </div>
                <div>
                    <label>URL изображения:</label>
                    <input
                        type="text"
                        value={selectedElement.content}
                        onChange={(e) => {
                            updateContent(e.target.value)
                        }}
                    />
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(315)
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
                            updateRotation(Number(e.target.value))
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
                        onChange={(e) => {
                            updatePosition(selectedElement.position.x, Number(e.target.value))
                        }}
                    />
                </div>
                <div>
                    <label>Положение X:</label>
                    <input
                        type="number"
                        value={selectedElement.position.x}
                        onChange={(e) => {
                            updatePosition(Number(e.target.value), selectedElement.position.y)
                        }}
                    />
                </div>
                <div>
                    <label>Ширина:</label>
                    <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => {
                            updateSize(Number(e.target.value), selectedElement.size.height)
                        }}
                    />
                </div>
                <div>
                    <label>Высота:</label>
                    <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => {
                            updateSize(selectedElement.size.width, Number(e.target.value))
                        }}
                    />
                </div>
                <div>
                    <label>Цвет текста:</label>
                    <input
                        type="color"
                        value={selectedElement.color}
                        onChange={(e) => {
                            updateColor(e.target.value)
                        }}
                    />
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(0)
                    }}>0°
                    </button>
                    <button onClick={() => {
                        updateRotation(45)
                    }}>45°
                    </button>
                    <button onClick={() => {
                        updateRotation(90)
                    }}>90°
                    </button>
                    <button onClick={() => {
                        updateRotation(135)
                    }}>135°
                    </button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <button onClick={() => {
                        updateRotation(180)
                    }}>180°
                    </button>
                    <button onClick={() => {
                        updateRotation(225)
                    }}>225°
                    </button>
                    <button onClick={() => {
                        updateRotation(270)
                    }}>270°
                    </button>
                    <button onClick={() => {
                        updateRotation(315)
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
                            updateRotation(Number(e.target.value))
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
                            updateLineWidth(Number(e.target.value))
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
                            updateBorderRadius(Number(e.target.value))
                        }}
                    />
                    <span>{selectedElement.borderRadius || 0}°</span>
                </div> : <div></div>}
            </>
        );
    }
};

export default PropertiesPanel;