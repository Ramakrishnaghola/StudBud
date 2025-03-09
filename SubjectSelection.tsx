import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Subject } from '../types';
import { availableSubjects } from '../data/subjects';

interface Props {
  selectedSubjects: Subject[];
  onSubjectToggle: (subject: Subject) => void;
  onComfortLevelChange: (subjectId: string, level: number) => void;
}

export function SubjectSelection({ selectedSubjects, onSubjectToggle, onComfortLevelChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Select Your Subjects</h2>
      <div className="space-y-4">
        {availableSubjects.map((subject) => {
          const isSelected = selectedSubjects.some((s) => s.id === subject.id);
          const selectedSubject = selectedSubjects.find((s) => s.id === subject.id);

          return (
            <div key={subject.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onSubjectToggle(subject as Subject)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    {isSelected ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <span className="font-medium text-gray-900">{subject.name}</span>
                </div>
                {isSelected && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Comfort Level:</span>
                    <select
                      value={selectedSubject?.comfortLevel || 1}
                      onChange={(e) =>
                        onComfortLevelChange(subject.id, parseInt(e.target.value, 10))
                      }
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}