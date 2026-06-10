import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { quiz, tTasks } from '../quizData';
import Matching from './Matching';
import SortableList from './SortableList';
import { addList, resetLists } from './quizSlice';
import { AppDispatch, RootState } from '../../store';

type tResult = {
  taskNumber: number;
  correct: number;
  total: number;
};

function shuffleItems(items: string[]) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function getInitialItems(tasks: tTasks, type: 'M' | 'S') {
  if (type === 'M') {
    return shuffleItems(tasks.map((item) => item.answer));
  }

  return shuffleItems(tasks.map((item) => item.question));
}

interface SortingProps {
  index: number;
  tasks: tTasks;
}

function Sorting({ index, tasks }: SortingProps) {
  const answers = useMemo(
    () => getInitialItems(tasks, 'S'),
    [tasks]
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, [dispatch, index, answers]);

  return (
    <Box sx={{ width: { xs: '100%', md: '70%' }, mx: 'auto' }}>
      <SortableList index={index} answers={answers} />
    </Box>
  );
}

function Quiz() {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const [results, setResults] = useState<tResult[] | null>(null);

  const handleCheck = () => {
    const checkedResults = quiz.map((item, index) => {
      const currentList = lists[index] || [];
      let correct = 0;

      if (item.type === 'M') {
        item.tasks.forEach((task, taskIndex) => {
          if (currentList[taskIndex] === task.answer) {
            correct += 1;
          }
        });
      }

      if (item.type === 'S') {
        currentList.forEach((question, currentIndex) => {
          const task = item.tasks.find((taskItem) => taskItem.question === question);
          if (task?.answer === String(currentIndex + 1)) {
            correct += 1;
          }
        });
      }

      return {
        taskNumber: index + 1,
        correct,
        total: item.tasks.length
      };
    });

    setResults(checkedResults);
  };

  const handleRestart = () => {
    const newLists = quiz.map((item) => getInitialItems(item.tasks, item.type));
    dispatch(resetLists(newLists));
    setResults(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {item.type === 'M' ? (
            <Matching index={index} tasks={item.tasks} />
          ) : (
            <Sorting index={index} tasks={item.tasks} />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Результаты теста
          </Typography>
          {results.map((item) => (
            <Typography key={item.taskNumber} variant="body1">
              Задание {item.taskNumber}.{' '}
              {item.correct === item.total
                ? 'Все ответы верные.'
                : `Верных ответов: ${item.correct}.`}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;
