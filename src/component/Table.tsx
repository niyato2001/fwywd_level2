import React, { useState } from 'react';

interface ToDoProps {
  isCompleted: boolean;
  name: string;
  description: string;
}

export const Table: React.FC = () => {
  const initialtoDos: ToDoProps[] = [
    { isCompleted: false, name: 'タスク1', description: '寝る' },
    { isCompleted: false, name: 'タスク2', description: '寝る' },
    { isCompleted: false, name: 'タスク3', description: '寝る' },
  ];

  // const [nameForm, setNameForm] = useState<string>('');
  // const [descriptionForm, setDescriptionForm] = useState<string>('');
  const initialFormState: ToDoProps = {
    isCompleted: false,
    name: '',
    description: '',
  };
  const [formState, setFormState] = useState<ToDoProps>(initialFormState);
  const [toDos, setToDos] = useState<ToDoProps[]>(initialtoDos);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedNumber, setEditedNumber] = useState<number>(-1);
  const newClick = () => {
    if (!formState.name || !formState.description) return;
    setToDos([...toDos, { ...formState, isCompleted: false }]);
    setFormState(initialFormState);
  };
  const editedClick = (toDo: ToDoProps, i: number) => {
    setIsEdited(!isEdited);
    setEditedNumber(i);
    console.log(editedNumber);
    setFormState(toDo);
  };
  const updateClick = () => {
    if (!formState.name || !formState.description) return;
    console.log(editedNumber);
    const newToDos: ToDoProps[] = [...toDos];
    newToDos[editedNumber] = formState;
    setToDos(newToDos);
    // setToDos(
    //   toDos.splice(editedNumber, 0, {
    //     isCompleted: false,
    //     name: nameForm,
    //     description: descriptionForm,
    //   }),
    // );
    console.log(toDos);
    setIsEdited(!isEdited);
    setFormState(initialFormState);
    setEditedNumber(-1);
    console.log(editedNumber);
    setIsEdited(!isEdited);
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
  return (
    <div className='my-20'>
      <table className='overflow-hidden rounded-md'>
        <thead>
          <tr className='bg-primary-700 text-white'>
            <th className='px-4 py-2'>check</th>
            <th className='px-4 py-2'>name</th>
            <th className='px-4 py-2'>description</th>
          </tr>
        </thead>
        <tbody className='text-primary-700'>
          {toDos.map((toDo, i) => (
            <tr key={i}>
              <td className='px-4 py-2'>
                <input
                  type='checkbox'
                  className='rounded-sm border-primary-700 text-primary-700 focus:ring-white'
                  defaultChecked={toDo.isCompleted}
                />
              </td>
              <td className='px-4 py-2'>{toDo.name}</td>
              <td className='px-4 py-2'>{toDo.description}</td>
              <td>
                <button
                  className='bg-primary-700 px-3 py-2 text-white'
                  onClick={() => editedClick(toDo, i)}
                >
                  編集
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEdited ? (
        <button onClick={() => updateClick()} className='mt-5 bg-primary-700 px-3 py-2 text-white'>
          更新
        </button>
      ) : (
        <button onClick={() => newClick()} className='mt-5 bg-primary-700 px-3 py-2 text-white'>
          新規追加
        </button>
      )}
      <form>
        <input
          type='text'
          placeholder='name'
          className='mt-5 block text-primary-700 focus:ring-white'
          onChange={(e) => handleInput('name', e.target.value)}
          value={formState.name}
        />
        <input
          type='text'
          placeholder='description'
          className='mt-5 block text-primary-700 focus:ring-white'
          onChange={(e) => handleInput('description', e.target.value)}
          value={formState.description}
        />
      </form>
    </div>
  );
};
