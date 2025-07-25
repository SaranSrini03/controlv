'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function EditorPage() {
  const [showModal, setShowModal] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const router = useRouter();

  const handleNewProject = () => {
    const id = uuidv4(); // Generate unique project ID
    // Pass size info via query params or state management
    router.push(`/p/${id}?w=${canvasSize.width}&h=${canvasSize.height}`);

  };

  const presets = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'A4 Portrait', width: 1240, height: 1754 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  ];

  return (
    <main className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded text-lg"
      >
        🎨 Create New
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[600px] flex gap-6">
            {/* Left Presets */}
            <div className="w-1/3 border-r border-gray-600 pr-4">
              <h2 className="font-bold mb-2">Presets</h2>
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setCanvasSize({ width: preset.width, height: preset.height })}
                  className="w-full bg-gray-700 hover:bg-gray-600 my-1 px-2 py-1 rounded"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Right Custom Input */}
            <div className="w-2/3">
              <h2 className="font-bold mb-2">Custom Size</h2>
              <div className="flex gap-3 mb-3">
                <input
                  type="number"
                  placeholder="Width"
                  value={canvasSize.width}
                  onChange={(e) => setCanvasSize({ ...canvasSize, width: +e.target.value })}
                  className="p-2 bg-gray-700 rounded w-1/2"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={canvasSize.height}
                  onChange={(e) => setCanvasSize({ ...canvasSize, height: +e.target.value })}
                  className="p-2 bg-gray-700 rounded w-1/2"
                />
              </div>
              <button
                onClick={handleNewProject}
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
              >
                ✅ Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
