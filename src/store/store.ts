import {configureStore} from "@reduxjs/toolkit";
import editorReducer from "./editorReducer.ts";

const store = configureStore({
    reducer: editorReducer
});

export type appState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;