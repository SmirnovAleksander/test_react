import React from 'react';

interface ResizeHandlesProps {
    onResizeStart: (e: React.MouseEvent, direction: string) => void;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResizeStart }) => {
    return (
        <>
            {/* Угловые маркеры */}
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'nwse-resize',
                }}
                onMouseDown={(e) => onResizeStart(e, 'bottom-right')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'nesw-resize',
                }}
                onMouseDown={(e) => onResizeStart(e, 'bottom-left')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'sw-resize',
                }}
                onMouseDown={(e) => onResizeStart(e, 'top-right')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'se-resize',
                }}
                onMouseDown={(e) => onResizeStart(e, 'top-left')}
            ></div>

            {/* Средние маркеры */}
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'n-resize',
                    transform: 'translateX(-50%)',
                }}
                onMouseDown={(e) => onResizeStart(e, 'top')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 's-resize',
                    transform: 'translateX(-50%)',
                }}
                onMouseDown={(e) => onResizeStart(e, 'bottom')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'e-resize',
                    transform: 'translateY(-50%)',
                }}
                onMouseDown={(e) => onResizeStart(e, 'right')}
            ></div>
            <div
                className="resize-handle"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: 'w-resize',
                    transform: 'translateY(-50%)',
                }}
                onMouseDown={(e) => onResizeStart(e, 'left')}
            ></div>
        </>
    );
};

export default ResizeHandles;
