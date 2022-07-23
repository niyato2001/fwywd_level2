import { useState } from 'react';

interface ToDoProps {
  isCompleted: boolean;
  name: string;
  description: string;
}

interface FormProps {
  name: string;
  description: string;
}

export const Table: React.FC = () => {
  const initialtoDos: ToDoProps[] = [
    { isCompleted: false, name: 'タスク1', description: '寝る' },
    { isCompleted: false, name: 'タスク2', description: '寝る' },
    { isCompleted: false, name: 'タスク3', description: '寝る' },
  ];
  const initialForm: FormProps = { name: '', description: '' };
  const [toDos, setToDos] = useState<ToDoProps[]>(initialtoDos);
  const handleClick = () => {
    setToDos([...toDos, { isCompleted: true, name: 'タスク4', description: '寝る' }]);
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
        />
        <input
          type='text'
          defaultValue='description'
          className='mt-5 block text-primary-700 focus:ring-white'
        />
      </form>
    </div>
  );
};
