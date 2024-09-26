import React from "react";

interface ElementProps {
    id: number;
    type: string;
}

interface ElementListProps {
    elements: ElementProps[];
    selectedElementId: number | null;
    onSelectElement: (id: number) => void;
    onDeleteElement: (id: number) => void;
}
const ElementList: React.FC<ElementListProps> = ({elements, onSelectElement, selectedElementId, onDeleteElement}) => {
    return (
        <div>
            <h3>Список элементов</h3>
            <ul>
                {elements.map(el => (
                    <li key={el.id} style={{listStyle: 'none'}}>
                        <span
                            onClick={() => onSelectElement(el.id)}
                            style={{cursor: 'pointer', fontWeight: el.id === selectedElementId ? 'bold' : 'normal'}}
                        >
                            {el.type}
                        </span>
                        <button onClick={() => onDeleteElement(el.id)}>
                            Удалить
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default ElementList;