import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { tTasks } from '../quizData';
import SortableList from './SortableList';
import { addList } from './quizSlice';
import { AppDispatch } from '../../store';

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

function shuffleItems(items: string[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function Matching({ index, tasks }: ComponentProps) {
  const answers = useMemo(
    () => shuffleItems(tasks.map((item) => item.answer)),
    [tasks]
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, [dispatch, index, answers]);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, itemIndex) => (
            <ListItem key={itemIndex}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right'
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid size={6}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;
