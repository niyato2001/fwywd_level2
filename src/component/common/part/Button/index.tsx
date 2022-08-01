export interface ToDoProps {
  isCompleted: boolean;
  name: string;
  description: string;
}

export interface ButtonProps {
  onClick: () => void;
  color: 'bg-primary-700' | 'bg-pink-700';
  name: string;
}

export const baseId = 'common-part-button';

export const Button: React.FC<ButtonProps> = ({ onClick, color, name }) => (
  <button data-testid={baseId} onClick={onClick} className={`${color} px-3 py-2 text-white`}>
    {name}
  </button>
);
