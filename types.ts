export interface Subject {
  id: string;
  name: string;
  selected: boolean;
  comfortLevel: number;
  resources: StudyResource[];
  allocatedHours: number;
}

export interface StudyResource {
  type: 'video' | 'article' | 'book';
  title: string;
  url: string;
}

export interface StudyPlan {
  subjects: Subject[];
  totalDays: number;
  dailyHours: number;
  progress: Record<string, number>;
}

export interface UserState {
  studyPlan: StudyPlan | null;
  setStudyPlan: (plan: StudyPlan) => void;
  updateProgress: (subjectId: string, progress: number) => void;
}