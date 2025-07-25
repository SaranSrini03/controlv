import React from 'react';

type ToolButtonProps = {
  icon: React.ReactElement;
  active: boolean;
  onClick: () => void;
};

export default function ToolButton({ icon, active, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded ${
        active ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      {icon}
    </button>
  );
}
