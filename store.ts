import { create } from 'zustand';
import { UserState, StudyPlan } from './types';

export const useStore = create<UserState>((set) => ({
  studyPlan: null,
  setStudyPlan: (plan) => set({ studyPlan: plan }),
  updateProgress: (subjectId, progress) =>
    set((state) => ({
      studyPlan: state.studyPlan
        ? {
            ...state.studyPlan,
            progress: {
              ...state.studyPlan.progress,
              [subjectId]: progress,
            },
          }
        : null,
    })),
}));