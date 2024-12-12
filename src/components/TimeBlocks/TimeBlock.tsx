import React from 'react';
import { Clock } from 'lucide-react';
import { TimeBlock as TimeBlockType } from '../../types/Task';

interface TimeBlockProps {
  block: TimeBlockType;
}

export function TimeBlockComponent({ block }: TimeBlockProps) {
  const totalMinutes = block.hours * 60 + block.minutes;
  const width = Math.min(totalMinutes / 480 * 100, 100); // 8 hours = 480 minutes = 100% width

  return (
    <div className="flex items-center gap-2 bg-indigo-50 rounded-lg p-2 text-sm">
      <Clock size={14} className="text-indigo-500" />
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-gray-600 font-medium">
        {block.hours}h {block.minutes}m
      </span>
    </div>
  );
}