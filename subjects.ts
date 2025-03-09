import { Subject } from '../types';

export const availableSubjects: Omit<Subject, 'selected' | 'comfortLevel' | 'allocatedHours'>[] = [
  {
    id: 'math',
    name: 'Mathematics',
    resources: [
      {
        type: 'video',
        title: 'Khan Academy Mathematics',
        url: 'https://www.khanacademy.org/math',
      },
      {
        type: 'book',
        title: 'Mathematics for Machine Learning',
        url: 'https://mml-book.github.io/',
      },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    resources: [
      {
        type: 'video',
        title: 'MIT OpenCourseWare Physics',
        url: 'https://ocw.mit.edu/courses/physics/',
      },
      {
        type: 'article',
        title: 'Physics Today',
        url: 'https://physicstoday.scitation.org/',
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    resources: [
      {
        type: 'video',
        title: 'Crash Course Chemistry',
        url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr',
      },
      {
        type: 'article',
        title: 'Chemistry LibreTexts',
        url: 'https://chem.libretexts.org/',
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    resources: [
      {
        type: 'video',
        title: 'Crash Course Biology',
        url: 'https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF',
      },
      {
        type: 'article',
        title: 'Biology LibreTexts',
        url: 'https://bio.libretexts.org/',
      },
    ],
  },
];