import React, { useState, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { SubjectSelection } from './components/SubjectSelection';
import { StudyDurationForm } from './components/StudyDurationForm';
import { StudyPlanDisplay } from './components/StudyPlanDisplay';
import { useStore } from './store';
import { Subject, StudyPlan } from './types';
import { availableSubjects } from './data/subjects';

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [totalDays, setTotalDays] = useState(30);
  const [dailyHours, setDailyHours] = useState(4);
  const { studyPlan, setStudyPlan } = useStore();

  const handleSubjectToggle = useCallback((subject: Subject) => {
    setSelectedSubjects((prev) => {
      const isSelected = prev.some((s) => s.id === subject.id);
      if (isSelected) {
        return prev.filter((s) => s.id === subject.id);
      }
      return [...prev, { ...subject, selected: true, comfortLevel: 1, allocatedHours: 0 }];
    });
  }, []);

  const handleComfortLevelChange = useCallback((subjectId: string, level: number) => {
    setSelectedSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subjectId ? { ...subject, comfortLevel: level } : subject
      )
    );
  }, []);

  const handleDurationChange = useCallback((days: number, hours: number) => {
    setTotalDays(days);
    setDailyHours(hours);
  }, []);

  const generateStudyPlan = useCallback(() => {
    if (selectedSubjects.length === 0) return;

    const totalHours = totalDays * dailyHours;
    const totalComfortLevels = selectedSubjects.reduce((sum, subject) => sum + (6 - subject.comfortLevel), 0);
    
    const subjects = selectedSubjects.map((subject) => {
      const weight = (6 - subject.comfortLevel) / totalComfortLevels;
      return {
        ...subject,
        allocatedHours: Math.round(totalHours * weight),
      };
    });

    const newPlan: StudyPlan = {
      subjects,
      totalDays,
      dailyHours,
      progress: {},
    };

    setStudyPlan(newPlan);
  }, [selectedSubjects, totalDays, dailyHours, setStudyPlan]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Study Plan Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {!studyPlan ? (
            <>
              <SubjectSelection
                selectedSubjects={selectedSubjects}
                onSubjectToggle={handleSubjectToggle}
                onComfortLevelChange={handleComfortLevelChange}
              />
              
              <StudyDurationForm
                totalDays={totalDays}
                dailyHours={dailyHours}
                onDurationChange={handleDurationChange}
              />

              <div className="flex justify-center">
                <button
                  onClick={generateStudyPlan}
                  disabled={selectedSubjects.length === 0}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Study Plan
                </button>
              </div>
            </>
          ) : (
            <StudyPlanDisplay studyPlan={studyPlan} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;