import { useState } from 'react';
import { ToDoProps } from '@/component/Table';

export const useToDos = () => {
  // const [nameForm, setNameForm] = useState<string>('');
  // const [descriptionForm, setDescriptionForm] = useState<string>('');

  const initialFormState: ToDoProps = {
    isCompleted: false,
    name: '',
    description: '',
  };
  const initialEditedNumber = -1;
  const [formState, setFormState] = useState<ToDoProps>(initialFormState);
  const [toDos, setToDos] = useState<ToDoProps[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedNumber, setEditedNumber] = useState<number>(initialEditedNumber);
  const newClick = () => {
    if (!formState.name || !formState.description) return;
    const newToDos: ToDoProps[] = [...toDos, { ...formState, isCompleted: false }];
    setToDos(newToDos);
    localStorage.setItem('todo', JSON.stringify(newToDos));
    setFormState(initialFormState);
  };
  const editedClick = (toDo: ToDoProps, i: number) => {
    setIsEdited(true);
    setEditedNumber(i);
    setFormState(toDo);
  };
  const deleteClick = (i: number) => {
    if (!confirm('本当に削除しますか？')) return;
    const newToDos: ToDoProps[] = [...toDos];
    newToDos.splice(i, 1);
    setToDos(newToDos);
    localStorage.setItem('todo', JSON.stringify(newToDos));
  };
  const updateClick = () => {
    if (!formState.name || !formState.description) return;
    const newToDos: ToDoProps[] = [...toDos];
    // 更新するときにはかならずnewToDosにする必要あり！
    newToDos[editedNumber] = formState;
    setToDos(newToDos);
    // setToDos(toDos.splice(editedNumber, 0, formState));
    localStorage.setItem('todo', JSON.stringify(newToDos));
    setFormState(initialFormState);
    setEditedNumber(initialEditedNumber);
    setIsEdited(false);
  };
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNameForm(e.target.value);
  // };
  // const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDescriptionForm(e.target.value);
  // };
  const handleInput = (key: string, value: string): void => {
    setFormState({ ...formState, [key]: value });
  };
  const handleCheck = (checked: boolean, i: number): void => {
    const updatedToDos: ToDoProps[] = [...toDos];
    updatedToDos[i] = { ...updatedToDos[i], isCompleted: checked };
    setToDos(updatedToDos);
    localStorage.setItem('todo', JSON.stringify(updatedToDos));
  };
  return {
    formState,
    toDos,
    setToDos,
    isEdited,
    editedNumber,
    newClick,
    editedClick,
    deleteClick,
    updateClick,
    handleInput,
    handleCheck,
  };
};
