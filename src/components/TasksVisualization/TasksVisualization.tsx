import React from 'react';
import { BarChart, Clock, Trophy } from 'lucide-react';
import { Task } from '../../types/Task';

interface TasksVisualizationProps {
  tasks: Task[];
}

export function TasksVisualization({ tasks }: TasksVisualizationProps) {
  const getTotalHours = (task: Task) =>
    task.timeBlocks.reduce((sum, block) => 
      sum + block.hours + (block.minutes / 60), 0
    );

  const totalHours = tasks.reduce((sum, task) => sum + getTotalHours(task), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <BarChart className="text-indigo-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Time Distribution</h2>
        </div>
        
        <div className="space-y-4">
          {tasks.map((task) => {
            const taskHours = getTotalHours(task);
            const percentage = (taskHours / totalHours) * 100;
            
            return (
              <div key={task.id} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {taskHours.toFixed(1)}h ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:from-indigo-600 group-hover:to-purple-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={24} />
          <h2 className="text-xl font-bold">Total Progress</h2>
        </div>
        <p className="text-4xl font-bold mb-2">{totalHours.toFixed(1)}</p>
        <p className="text-indigo-100">Hours Tracked</p>
      </div>
    </div>
  );
}