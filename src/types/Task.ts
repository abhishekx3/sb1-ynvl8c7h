export interface Task {
  id: string;
  title: string;
  timeBlocks: TimeBlock[];
  createdAt: Date;
}

export interface TimeBlock {
  id: string;
  hours: number;
  minutes: number;
  timestamp: Date;
}