export interface TextElementProps {
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

export interface ImageElementProps {
    id: number;
    type: 'image';
    content: string; // URL изображения
    top: number;
    left: number;
    width: number;
    height: number;
    rotation: number;
}

export interface ShapeElementProps {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    top: number;
    left: number;
    width: number;
    height: number;
    color: string; // Цвет фигуры
    rotation: number;
    lineWidth?: number;
}

// Объединенный интерфейс для элементов
export type ElementProps = TextElementProps | ImageElementProps | ShapeElementProps;