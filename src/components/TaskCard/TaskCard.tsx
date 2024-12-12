import React, { useState } from 'react';
import { Clock, BarChart } from 'lucide-react';
import { Task } from '../../types/Task';
import { TimeInputModal } from '../TimeInput/TimeInputModal';
import { TimeBlockComponent } from '../TimeBlocks/TimeBlock';

interface TaskCardProps {
  task: Task;
  onLogTime: (taskId: string, hours: number, minutes: number) => void;
}

export function TaskCard({ task, onLogTime }: TaskCardProps) {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const totalHours = task.timeBlocks.reduce((sum, block) => 
    sum + block.hours + (block.minutes / 60), 0
  );

  const handleTimeSubmit = (hours: number, minutes: number) => {
    onLogTime(task.id, hours, minutes);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
          <p className="text-sm text-gray-500">
            Total: {totalHours.toFixed(1)} hours
          </p>
        </div>
        <button
          onClick={() => setIsTimeModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <Clock size={18} />
          Log Time
        </button>
      </div>

      <div className="space-y-2 mt-4">
        {task.timeBlocks.map((block) => (
          <TimeBlockComponent key={block.id} block={block} />
        ))}
      </div>

      <TimeInputModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSubmit={handleTimeSubmit}
      />
    </div>
  );
}