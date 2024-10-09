import  {ImageElementProps, ShapeElementProps, TextElementProps} from "./types.ts";

export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export const DESELECT_ELEMENT = 'DESELECT_ELEMENT';

export interface AddElementAction {
    type: typeof ADD_ELEMENT;
    payload: TextElementProps | ImageElementProps | ShapeElementProps;
}

export interface DeleteElementAction {
    type: typeof DELETE_ELEMENT;
    payload: number; // ID элемента
}

export interface SelectElementAction {
    type: typeof SELECT_ELEMENT;
    payload: number | null; // ID выбранного элемента
}

interface DeselectElementAction {
    type: typeof DESELECT_ELEMENT;
}

export interface UpdateElementAction {
    type: typeof UPDATE_ELEMENT;
    payload: {
        id: number; // ID элемента
        updates: Partial<TextElementProps | ImageElementProps | ShapeElementProps>; // Поля для обновления
    };
}

// Объединяем все действия в тип
export type ElementActions =
    | AddElementAction
    | DeleteElementAction
    | SelectElementAction
    | UpdateElementAction
    | DeselectElementAction;

export const addElement = (element: TextElementProps | ImageElementProps | ShapeElementProps): AddElementAction => ({
    type: ADD_ELEMENT,
    payload: element,
});

export const deleteElement = (id: number): DeleteElementAction => ({
    type: DELETE_ELEMENT,
    payload: id,
});

export const selectElement = (id: number | null): SelectElementAction => ({
    type: SELECT_ELEMENT,
    payload: id,
});

export const updateElement = (id: number, updates: Partial<TextElementProps | ImageElementProps | ShapeElementProps>): UpdateElementAction => ({
    type: UPDATE_ELEMENT,
    payload: { id, updates },
});

export const deselectElement = (): DeselectElementAction => ({
    type: DESELECT_ELEMENT,
});