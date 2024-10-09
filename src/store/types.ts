export interface TextElementProps {
    id: number;
    type: 'text';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    fontSize: number;
    fontFamily: string;
    color: string;
    rotation: number;
}

export interface ImageElementProps {
    id: number;
    type: 'image';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
}

export interface ShapeElementProps {
    id: number;
    type: 'rectangle' | 'circle' | 'line';
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
    rotation: number;
    lineWidth?: number;
    borderRadius?: number;
}

export type ElementProps = TextElementProps | ImageElementProps | ShapeElementProps;