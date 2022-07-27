export interface InputProps {
  label: string;
}
import { useFormContext } from 'react-hook-form';

export const baseId = 'common-part-input';

export const Input: React.FC<InputProps> = ({ label }) => {
  const { register } = useFormContext();
  return (
    <input
      type='text'
      placeholder={label}
      className='mt-5 block border-primary-700 text-primary-700 focus:border-primary-500 focus:ring-white'
      {...register(label, {
        required: true,
        // onChange: (e) => handleInput('name', e.target.value),
      })}
      // value={formState.name}
    />
  );
};
