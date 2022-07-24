import React, { useState, useEffect } from 'react';

interface ToDoProps {
  isCompleted: boolean;
  name: string;
  description: string;
}

export const Table: React.FC = () => {
  useEffect(() => {
    setToDos(fetchToDos());
  }, []);

  const fetchToDos = (): ToDoProps[] => {
    const data = localStorage.getItem('todo');
    if (data) return JSON.parse(data);
    return [];
  };

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
                  checked={toDo.isCompleted}
                  onChange={(e) => handleCheck(e.target.checked, i)}
                />
                {/*HTMLでは 属性としてcheckedしかないがReactでは状態を反映するcheckedと反映しないdefaultCheckedが存在する。 */}
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
              <td>
                <button className='bg-pink-700 px-3 py-2 text-white' onClick={() => deleteClick(i)}>
                  削除
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
          className='mt-5 block border-primary-700 text-primary-700 focus:border-primary-500 focus:ring-white'
          onChange={(e) => handleInput('name', e.target.value)}
          value={formState.name}
        />
        <input
          type='text'
          placeholder='description'
          className='mt-5 block border-primary-700 text-primary-700 focus:border-primary-500 focus:ring-white'
          onChange={(e) => handleInput('description', e.target.value)}
          value={formState.description}
        />
      </form>
    </div>
  );
};
