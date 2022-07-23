import { useState } from 'react';

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

  const [nameForm, setNameForm] = useState<string>('');
  const [descriptionForm, setDescriptionForm] = useState<string>('');
  const [toDos, setToDos] = useState<ToDoProps[]>(initialtoDos);
  const handleClick = () => {
    setToDos([...toDos, { isCompleted: false, name: nameForm, description: descriptionForm }]);
    setNameForm('');
    setDescriptionForm('');
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameForm(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionForm(e.target.value);
  };
  return (
    <div className='my-20'>
      <table className='overflow-hidden rounded-md'>
        <thead>
          <tr className='bg-primary-700 text-white'>
            <th className='px-4'>check</th>
            <th className='px-4'>name</th>
            <th className='px-4'>description</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((toDo, i) => (
            <tr key={i}>
              <td className='px-4'>
                <input
                  type='checkbox'
                  className='rounded-sm border-primary-700 text-primary-700 focus:ring-white'
                  defaultChecked={toDo.isCompleted}
                />
              </td>
              <td className='px-4'>{toDo.name}</td>
              <td className='px-4'>{toDo.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClick} className='mt-5 bg-primary-700 px-3 text-white'>
        新規追加
      </button>
      <form>
        <input
          type='text'
          defaultValue='name'
          className='mt-5 block text-primary-700 focus:ring-white'
          onChange={handleNameChange}
          value={nameForm}
        />
        <input
          type='text'
          defaultValue='description'
          className='mt-5 block text-primary-700 focus:ring-white'
          onChange={handleDescriptionChange}
          value={descriptionForm}
        />
      </form>
    </div>
  );
};
