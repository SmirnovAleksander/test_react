export interface TextElementProps {
    id: number;
    type: 'text';
    content: string; // Текстовое содержимое
    position: { x: number; y: number };
    size: { width: number; height: number };
    fontSize: number; // Размер шрифта
    fontFamily: string; // Шрифт
    color: string; // Цвет текста
    rotation: number;
    selected: boolean;
}

export interface ImageElementProps {
    id: number;
    type: 'image';
    content: string; // URL изображения
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
}

export interface ShapeElementProps {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string; // Цвет фигуры
    rotation: number;
    lineWidth?: number;
    borderRadius?: number;
}

// Объединенный интерфейс для элементов
export type ElementProps = TextElementProps | ImageElementProps | ShapeElementProps;