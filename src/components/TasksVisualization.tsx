import React from 'react';
import { Task } from '../types/Task';

interface TasksVisualizationProps {
  tasks: Task[];
}

export function TasksVisualization({ tasks }: TasksVisualizationProps) {
  const totalHours = tasks.reduce((sum, task) => sum + task.hoursLogged, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Time Distribution</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{task.title}</span>
              <span className="text-sm text-gray-500">
                {((task.hoursLogged / totalHours) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{
                  width: `${(task.hoursLogged / totalHours) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-3xl font-bold text-indigo-600">{totalHours}</p>
        <p className="text-gray-600">Total Hours Tracked</p>
      </div>
    </div>
  );
}