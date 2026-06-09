import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  resetQuiz,
  setAnswer,
  setMatchingAnswer,
  setSortingOrder,
  submitQuiz,
} from '../store/quizSlice';

const quizQuestions = {
  q1: {
    type: 'single' as const,
    prompt: 'Какой интерфейс используется для взаимодействия с операционной системой на уровне окон и кнопок?',
    options: ['CLI', 'GUI', 'API', 'BIOS'],
    correct: 'GUI',
  },
  q2: {
    type: 'multiple' as const,
    prompt: 'Выберите семейства операционных систем, основанные на ядре Linux.',
    options: ['Ubuntu', 'Windows 10', 'Fedora', 'macOS', 'Debian'],
    correct: ['Ubuntu', 'Fedora', 'Debian'],
  },
  q3: {
    type: 'matching' as const,
    prompt: 'Сопоставьте систему с годом её первого выпуска.',
    left: ['Windows 95', 'macOS', 'Linux Mint', 'Fedora'],
    right: ['2003', '1995', '2006', '2001'],
    correct: {
      'Windows 95': '1995',
      macOS: '2001',
      'Linux Mint': '2006',
      Fedora: '2003',
    },
  },
  q4: {
    type: 'sorting' as const,
    prompt: 'Упорядочите операционные системы от самой ранней к самой новой.',
    items: ['Debian', 'Windows XP', 'Windows 10', 'Ubuntu'],
    correct: ['Debian', 'Windows XP', 'Ubuntu', 'Windows 10'],
  },
  q5: {
    type: 'single' as const,
    prompt: 'Какая система из таблицы имеет наибольшую долю рынка?',
    options: ['Windows 11', 'Windows 10', 'macOS Sonoma', 'Ubuntu'],
    correct: 'Windows 11',
  },
  q6: {
    type: 'multiple' as const,
    prompt: 'Какие из перечисленных задач относятся к ответственности операционной системы?',
    options: ['Управление памятью', 'Рендеринг шрифтов', 'Контроль задач', 'Обработка ввода/вывода', 'Создание макетов'],
    correct: ['Управление памятью', 'Контроль задач', 'Обработка ввода/вывода'],
  },
};

type QuizQuestion = typeof quizQuestions[keyof typeof quizQuestions];

const QuizPage: React.FC = () => {
  const dispatch = useDispatch();
  const { answers, submitted, score } = useSelector((state: RootState) => state.quiz);

  const handleSingleChange = (questionId: string, value: string) => {
    dispatch(setAnswer({ questionId, value }));
  };

  const handleMultipleToggle = (questionId: string, option: string) => {
    const current = answers[questionId] as string[];
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    dispatch(setAnswer({ questionId, value: next }));
  };

  const handleMatchingChange = (questionId: string, leftValue: string, rightValue: string) => {
    dispatch(setMatchingAnswer({ questionId, leftValue, rightValue }));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const current = [...(answers.q4 as string[])];
    const target = index + direction;
    if (target < 0 || target >= current.length) {
      return;
    }
    [current[index], current[target]] = [current[target], current[index]];
    dispatch(setSortingOrder(current));
  };

  const compareArrays = (a: string[], b: string[]) =>
    a.length === b.length && a.every((item) => b.includes(item));

  const getScore = () => {
    let total = 0;

    const answerQ1 = answers.q1 as string;
    if (answerQ1 === quizQuestions.q1.correct) total += 1;

    const answerQ2 = answers.q2 as string[];
    if (compareArrays(answerQ2, quizQuestions.q2.correct)) total += 1;

    const answerQ3 = answers.q3 as Record<string, string>;
    const expectedQ3: Record<string, string> = quizQuestions.q3.correct;
    if (
      Object.keys(expectedQ3).every((key) => answerQ3[key] === expectedQ3[key]) &&
      Object.keys(answerQ3).length === Object.keys(expectedQ3).length
    ) {
      total += 1;
    }

    const answerQ4 = answers.q4 as string[];
    if (answerQ4.every((item, index) => item === quizQuestions.q4.correct[index])) total += 1;

    const answerQ5 = answers.q5 as string;
    if (answerQ5 === quizQuestions.q5.correct) total += 1;

    const answerQ6 = answers.q6 as string[];
    if (compareArrays(answerQ6, quizQuestions.q6.correct)) total += 1;

    return total;
  };

  const handleSubmit = () => {
    const newScore = getScore();
    dispatch(submitQuiz(newScore));
  };

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  const renderQuestion = (questionId: string, question: QuizQuestion) => {
    if (question.type === 'single') {
      return (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">{question.prompt}</FormLabel>
          <Stack spacing={1} sx={{ marginTop: 1 }}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={(answers[questionId] as string) === option}
                    onChange={() => handleSingleChange(questionId, option)}
                    sx={{ padding: 0.5 }}
                  />
                }
                label={option}
              />
            ))}
          </Stack>
        </FormControl>
      );
    }

    if (question.type === 'multiple') {
      return (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">{question.prompt}</FormLabel>
          <Stack spacing={1} sx={{ marginTop: 1 }}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={(answers[questionId] as string[]).includes(option)}
                    onChange={() => handleMultipleToggle(questionId, option)}
                  />
                }
                label={option}
              />
            ))}
          </Stack>
        </FormControl>
      );
    }

    if (question.type === 'matching') {
      const currentAnswers = answers[questionId] as Record<string, string>;
      return (
        <Box>
          <Typography variant="body1" gutterBottom>
            {question.prompt}
          </Typography>
          <Stack spacing={2}>
            {question.left.map((leftItem) => (
              <Box key={leftItem} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ minWidth: 160 }}>{leftItem}</Typography>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={currentAnswers[leftItem] ?? ''}
                    onChange={(event) => handleMatchingChange(questionId, leftItem, event.target.value)}
                  >
                    {question.right.map((rightItem) => (
                      <MenuItem key={rightItem} value={rightItem}>
                        {rightItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Stack>
        </Box>
      );
    }

    if (question.type === 'sorting') {
      const currentOrder = answers.q4 as string[];
      return (
        <Box>
          <Typography variant="body1" gutterBottom>
            {question.prompt}
          </Typography>
          <List>
            {currentOrder.map((item, index) => (
              <ListItem key={item} disableGutters>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="up" onClick={() => handleMove(index, -1)}>
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" aria-label="down" onClick={() => handleMove(index, 1)}>
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Box sx={{ maxWidth: 960, margin: '0 auto' }}>
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Интерактивный тест по операционным системам
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Пройдите тест из 6 заданий. Вопросы включают выбор одного ответа, выбор нескольких ответов, сопоставление и сортировку.
        </Typography>

        <Stack spacing={2}>
          {(Object.entries(quizQuestions) as [string, QuizQuestion][]).map(([id, question]) => (
            <Card key={id} variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  Вопрос {id.slice(1)}
                </Typography>
                {renderQuestion(id, question)}
              </CardContent>
            </Card>
          ))}
        </Stack>

        {submitted && score !== null && (
          <Alert severity={score >= 4 ? 'success' : 'info'} sx={{ marginTop: 3 }}>
            Вы набрали {score} из 6 баллов.
          </Alert>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginTop: 3 }}> 
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Проверить ответы
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Сбросить ответы
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default QuizPage;
