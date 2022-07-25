import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToDos } from '@/hook/useToDos';

export interface ToDoProps {
  isCompleted: boolean;
  name: string;
  description: string;
}

export interface IFormValues {
  name: string;
  description: string;
}

export const Table: React.FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  //   {
  //   defaultValues: { name: '', description: '' },
  // }
  const toDoSubmit = handleSubmit((data) => {
    !isEdited
      ? newClick(JSON.parse(JSON.stringify(data)))
      : updateClick(JSON.parse(JSON.stringify(data)));
    reset();
  });

  const {
    toDos,
    setToDos,
    isEdited,
    newClick,
    // formState,
    editedClick,
    deleteClick,
    updateClick,
    // handleInput,
    handleCheck,
  } = useToDos();

  useLayoutEffect(() => {
    const fetchToDos = (): ToDoProps[] => {
      const data = localStorage.getItem('todo');
      if (!data) return [];
      return JSON.parse(data);
    };
    setToDos(fetchToDos());
  }, [setToDos]);
  // 空配列だと依存関係がどうちゃらとeslintに怒られるので、fetchToDos()をuseEffectの中で定義して依存配列にsetToDosを指定すると行けるらしい。
  // Presentation
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
                  onClick={() => {
                    setValue('name', toDo.name);
                    setValue('description', toDo.description);
                    editedClick(toDo, i);
                  }}
                  className='bg-primary-700 px-3 py-2 text-white'
                >
                  編集
                </button>
              </td>
              <td>
                <button onClick={() => deleteClick(i)} className='bg-pink-700 px-3 py-2 text-white'>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={toDoSubmit}>
        {isEdited ? (
          <button type='submit' className='mt-5 bg-primary-700 px-3 py-2 text-white'>
            更新
          </button>
        ) : (
          <button type='submit' className='mt-5 bg-primary-700 px-3 py-2 text-white'>
            新規追加
          </button>
        )}

        <input
          type='text'
          placeholder='name'
          className='mt-5 block border-primary-700 text-primary-700 focus:border-primary-500 focus:ring-white'
          {...register('name', {
            required: true,
            // onChange: (e) => handleInput('name', e.target.value),
          })}
          // value={formState.name}
        />
        <input
          type='text'
          placeholder='description'
          className='mt-5 block border-primary-700 text-primary-700 focus:border-primary-500 focus:ring-white'
          {...register('description', {
            required: true,
            // onChange: (e) => handleInput('description', e.target.value),
          })}
          // value={formState.description}
        />
      </form>
    </div>
  );
};
