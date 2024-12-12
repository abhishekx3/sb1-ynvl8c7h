import React from 'react';
import { Clock, Trophy } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onLogHours: (taskId: string, hours: number) => void;
}

export function TaskCard({ task, onLogHours }: TaskCardProps) {
  const handleLogHours = () => {
    const hours = parseFloat(prompt('Enter hours worked:', '1') || '0');
    if (hours > 0) {
      onLogHours(task.id, hours);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <button
          onClick={handleLogHours}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
        >
          <Clock size={18} />
          Log Hours
        </button>
      </div>
      <div className="flex items-center gap-3">
        <Trophy className="text-yellow-500" size={24} />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${Math.min((task.hoursLogged / 40) * 100, 100)}%` }}
            />
          </div>
        </div>
        <span className="text-lg font-semibold text-gray-700">
          {task.hoursLogged}h
        </span>
      </div>
    </div>
  );
}