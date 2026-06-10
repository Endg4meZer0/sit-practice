export type tTasks = {
  question: string;
  answer: string;
}[];

export type tQuizzes = {
  id: number;
  type: 'M' | 'S';
  title: string;
  tasks: tTasks;
}[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте сооружение и город, в котором оно расположено.',
    tasks: [
      {
        question: 'Башня Аль-Хамра',
        answer: 'Кувейт'
      },
      {
        question: 'Башня CITIC',
        answer: 'Гуанчжоу'
      },
      {
        question: 'Телебашня «Коктобе»',
        answer: 'Алматы'
      },
      {
        question: 'Си-Эн Тауэр',
        answer: 'Торонто'
      }
    ]
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте сооружение и его высоту.',
    tasks: [
      {
        question: 'Tokyo Skytree',
        answer: '634'
      },
      {
        question: 'Бурдж-Халифа',
        answer: '838'
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '448.7'
      },
      {
        question: 'Останкинская башня',
        answer: '540.1'
      },
      {
        question: 'Lotte World Tower',
        answer: '555'
      }
    ]
  },
  {
    id: 3,
    type: 'S',
    title: 'Отсортируйте здания по убыванию их высоты.',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: '1'
      },
      {
        question: 'Tokyo Skytree',
        answer: '2'
      },
      {
        question: 'Lotte World Tower',
        answer: '3'
      },
      {
        question: 'Останкинская башня',
        answer: '4'
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '5'
      }
    ]
  }
];
