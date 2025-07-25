'use client';

import { MousePointer, Brush, Eraser } from 'lucide-react';
import ToolButton from './ToolButton';

type ToolType = 'select' | 'brush' | 'eraser';

type ToolPanelProps = {
  currentTool: ToolType;
  setTool: (tool: ToolType) => void;
};

export default function ToolPanel({ currentTool, setTool }: ToolPanelProps) {
  return (
    <aside className="w-16 bg-gray-800 p-2 flex flex-col gap-2 border-r border-gray-700 items-center">
      <ToolButton
        icon={<MousePointer size={20} />}
        active={currentTool === 'select'}
        onClick={() => setTool('select')}
      />
      <ToolButton
        icon={<Brush size={20} />}
        active={currentTool === 'brush'}
        onClick={() => setTool('brush')}
      />
      <ToolButton
        icon={<Eraser size={20} />}
        active={currentTool === 'eraser'}
        onClick={() => setTool('eraser')}
      />
    </aside>
  );
}
