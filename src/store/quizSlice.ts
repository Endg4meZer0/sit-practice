import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AnswerValue = string | string[] | Record<string, string>;

type QuizState = {
  answers: Record<string, AnswerValue>;
  submitted: boolean;
  score: number | null;
};

const initialState: QuizState = {
  answers: {
    q1: '',
    q2: [],
    q3: {
      'Windows 95': '',
      macOS: '',
      'Linux Mint': '',
      Fedora: '',
    },
    q4: ['Windows 10', 'Ubuntu', 'Windows XP', 'Debian'],
    q5: '',
    q6: [],
  },
  submitted: false,
  score: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<{ questionId: string; value: AnswerValue }>) {
      state.answers[action.payload.questionId] = action.payload.value;
    },
    setMatchingAnswer(
      state,
      action: PayloadAction<{ questionId: string; leftValue: string; rightValue: string }>
    ) {
      const current = state.answers[action.payload.questionId] as Record<string, string>;
      state.answers[action.payload.questionId] = {
        ...current,
        [action.payload.leftValue]: action.payload.rightValue,
      };
    },
    setSortingOrder(state, action: PayloadAction<string[]>) {
      state.answers.q4 = action.payload;
    },
    submitQuiz(state, action: PayloadAction<number>) {
      state.submitted = true;
      state.score = action.payload;
    },
    resetQuiz(state) {
      state.answers = initialState.answers;
      state.submitted = false;
      state.score = null;
    },
  },
});

export const { setAnswer, setMatchingAnswer, setSortingOrder, submitQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
