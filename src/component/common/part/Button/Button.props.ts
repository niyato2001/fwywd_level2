import { useForm } from 'react-hook-form';
import { ButtonProps, ToDoProps } from './';
import { useToDos } from '@/hook/useToDos';

const UpdateClick = (toDo: ToDoProps, i: number) => {
  const methods = useForm();
  const { editedClick } = useToDos();
  methods.setValue('name', toDo.name);
  methods.setValue('description', toDo.description);
  editedClick(toDo, i);
};

const DeleteClick = (i: number) => {
  const { deleteClick } = useToDos();
  deleteClick(i);
};

const updateProps: ButtonProps = {
  onClick: () => {
    UpdateClick;
  },
  color: 'bg-primary-700',
  name: '編集',
};

const deleteProps: ButtonProps = {
  onClick: () => DeleteClick,
  color: 'bg-pink-700',
  name: '削除',
};

export const propObj: { [key: string]: ButtonProps } = {
  update: updateProps,
  delete: deleteProps,
};
