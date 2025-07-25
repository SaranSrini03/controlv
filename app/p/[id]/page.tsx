'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ToolPanel from '@/components/ToolPanel';

type ToolType = 'select' | 'brush' | 'eraser';

export default function EditorInstancePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const width = parseInt(searchParams.get('w') || '1080');
  const height = parseInt(searchParams.get('h') || '1080');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<ToolType>('select');
  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);


  const brushSize = tool === 'eraser' ? 20 : 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [width, height]);

  const getCanvasCoords = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool === 'select') return;
    setDrawing(true);

    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!drawing || tool === 'select') return;

    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : '#000000';
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  };


  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <main className="min-h-screen flex bg-gray-900 text-white relative">
      <ToolPanel currentTool={tool} setTool={setTool} />

      {/* Canvas and custom cursor */}
      <section className="flex-1 p-8 overflow-auto flex flex-col items-center relative">
        <h1 className="text-2xl font-bold mb-4">🎨 Project ID: {id}</h1>
        <div
          ref={containerRef}
          className="bg-checkboard p-2 shadow-lg rounded relative"
        >
          <canvas
            ref={canvasRef}
            className={`border border-gray-400 ${tool !== 'select' ? 'cursor-none' : 'cursor-default'}`}
            style={{ maxWidth: '100%', maxHeight: '90vh' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          {/* Custom Cursor Circle */}
          {tool !== 'select' && (
            <div
              className="pointer-events-none absolute rounded-full border border-black opacity-80"
              style={{
                top: `${mousePos.y - brushSize / 2}px`,
                left: `${mousePos.x - brushSize / 2}px`,
                width: `${brushSize}px`,
                height: `${brushSize}px`,
              }}
            />
          )}
        </div>

        <p className="mt-4 text-gray-300">🧰 Active Tool: <strong>{tool.toUpperCase()}</strong></p>
      </section>
    </main>
  );
}
