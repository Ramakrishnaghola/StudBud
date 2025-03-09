import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, Video, FileText } from 'lucide-react';
import { StudyPlan } from '../types';

interface Props {
  studyPlan: StudyPlan;
}

export function StudyPlanDisplay({ studyPlan }: Props) {
  const chartData = studyPlan.subjects.map((subject) => ({
    name: subject.name,
    hours: subject.allocatedHours,
    progress: (studyPlan.progress[subject.id] || 0) * 100,
  }));

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Your Study Plan</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Time Allocation</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#4F46E5" name="Allocated Hours" />
              <Bar dataKey="progress" fill="#34D399" name="Progress %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        {studyPlan.subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <span className="text-sm text-gray-500">
                {subject.allocatedHours} hours allocated
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${studyPlan.progress[subject.id] * 100 || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round((studyPlan.progress[subject.id] || 0) * 100)}%
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Recommended Resources:</h4>
                {subject.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                  >
                    {resource.type === 'video' && <Video className="w-4 h-4" />}
                    {resource.type === 'book' && <Book className="w-4 h-4" />}
                    {resource.type === 'article' && <FileText className="w-4 h-4" />}
                    <span>{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}