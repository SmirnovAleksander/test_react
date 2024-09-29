import {ElementProps, ImageElementProps, ShapeElementProps, TextElementProps} from "./types.ts";
import {configureStore} from "@reduxjs/toolkit";
import {ElementActions} from "./actions.ts";

type EditorState  = {
    elements: ElementProps[];
    selectedElementId: number | null;
}
const initialState: EditorState  = {
    elements: [],
    selectedElementId: null,
};
const editorReducer = (state = initialState, action: ElementActions): EditorState  => {
    switch (action.type) {
        case 'ADD_ELEMENT':
            return {
                ...state,
                elements: [...state.elements, action.payload],
            };
        case 'DELETE_ELEMENT':
            return {
                ...state,
                elements: state.elements.filter(el => el.id !== action.payload),
                selectedElementId: state.selectedElementId === action.payload ? null : state.selectedElementId,
            };
        case 'SELECT_ELEMENT':
            return {
                ...state,
                selectedElementId: action.payload,
            };
        case 'UPDATE_ELEMENT':
            return {
                ...state,
                elements: state.elements.map(el => {
                    if (el.id === action.payload.id) {
                        if (el.type === 'text') {
                            return { ...el, ...action.payload.updates as Partial<TextElementProps> };
                        } else if (el.type === 'image') {
                            return { ...el, ...action.payload.updates as Partial<ImageElementProps> };
                        } else if (el.type === 'rectangle' || el.type === 'circle' || el.type === 'line') {
                            return { ...el, ...action.payload.updates as Partial<ShapeElementProps> };
                        }
                    }
                    return el;
                }),
            };
        default:
            return state;
    }
}
const store = configureStore({
    reducer: editorReducer
});

export type appStoreState = ReturnType<typeof store.getState>;
export type AppStoreDispatch = typeof store.dispatch;

export default store;