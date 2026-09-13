export type ViewMode = 'boot' | 'about' | 'upload' | 'live' | 'results' | 'product';

export interface LogEntry {
  id: string;
  timestamp: string;
  agent: string;
  colorClass: string;
  textColorClass: string;
  title: string;
  description: string;
}

export type ConfrontationStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ModalState {
  isOpen: boolean;
  type: 'audit' | 'diff' | 'summary' | null;
  title: string;
}
