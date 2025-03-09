import React from 'react';

interface Props {
  totalDays: number;
  dailyHours: number;
  onDurationChange: (days: number, hours: number) => void;
}

export function StudyDurationForm({ totalDays, dailyHours, onDurationChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Set Study Duration</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="totalDays" className="block text-sm font-medium text-gray-700">
            Total Days
          </label>
          <input
            type="number"
            id="totalDays"
            min="1"
            value={totalDays}
            onChange={(e) => onDurationChange(parseInt(e.target.value, 10), dailyHours)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="dailyHours" className="block text-sm font-medium text-gray-700">
            Daily Hours
          </label>
          <input
            type="number"
            id="dailyHours"
            min="1"
            max="24"
            value={dailyHours}
            onChange={(e) => onDurationChange(totalDays, parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}