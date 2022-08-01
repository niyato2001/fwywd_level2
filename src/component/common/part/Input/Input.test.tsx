import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { propObj } from './Input.props';
import { Input, InputProps, baseId } from './';

let props: InputProps;

describe('default', () => {
  beforeEach(() => {
    props = propObj.default;
  });

  it('名前フォームがあること', () => {
    const TestInput = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Input {...props} />
        </FormProvider>
      );
    };
    render(<TestInput />);
    expect(screen.getByTestId(baseId)).toBeInTheDocument();
  });
});
