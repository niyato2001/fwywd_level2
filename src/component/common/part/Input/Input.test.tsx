import { render, screen } from '@testing-library/react';
import { propObj } from './Input.props';
import { Input, InputProps, baseId } from './';

let props: InputProps;

describe('default', () => {
  beforeEach(() => {
    props = propObj.default;
  });

  it('default の props に対するテストケースを書くこと', () => {
    render(<Input {...props} />);
    expect(screen.getByTestId(baseId)).toBeInTheDocument();
  });
});
