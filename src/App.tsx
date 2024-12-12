import React, { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard/TaskCard';
import { TasksVisualization } from './components/TasksVisualization/TasksVisualization';
import { Task, TimeBlock } from './types/Task';
import { ClipboardList } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      timeBlocks: [],
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleLogTime = (taskId: string, hours: number, minutes: number) => {
    const newTimeBlock: TimeBlock = {
      id: crypto.randomUUID(),
      hours,
      minutes,
      timestamp: new Date(),
    };

    setTasks(tasks.map((task) =>
      task.id === taskId
        ? { ...task, timeBlocks: [...task.timeBlocks, newTimeBlock] }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-3 rounded-xl shadow-md">
            <ClipboardList className="text-indigo-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Task Time Tracker</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TaskForm onAddTask={handleAddTask} />
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onLogTime={handleLogTime}
                />
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
                  <p className="text-gray-500">No tasks yet. Add your first task to get started!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {tasks.length > 0 && <TasksVisualization tasks={tasks} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;