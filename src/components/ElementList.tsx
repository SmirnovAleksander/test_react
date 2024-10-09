import React from "react";
import {AppDispatch, appState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {deleteElement, selectElement} from "../store/actions.ts";

const ElementList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const elements = useSelector((state: appState) => state.elements);
    const selectedElementId = useSelector((state: appState) => state.selectedElementId);
    const handleSelectElement = (id: number) => {
        dispatch(selectElement(id));
    };

    const handleDeleteElement = (id: number) => {
        dispatch(deleteElement(id));
    };
    return (
        <div>
            <h3>Список элементов</h3>
            <ul>
                {elements.map(el => (
                    <li key={el.id} style={{listStyle: 'none'}}>
                        <span
                            onClick={() => handleSelectElement(el.id)}
                            style={{cursor: 'pointer', fontWeight: el.id === selectedElementId ? 'bold' : 'normal'}}
                        >
                            {el.type}
                        </span>
                        <button onClick={() => handleDeleteElement(el.id)}>
                            Удалить
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default ElementList;