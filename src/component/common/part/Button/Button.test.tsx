import { render, screen } from '@testing-library/react';
import { propObj } from './Button.props';
import { Button, ButtonProps, baseId } from './';

let props: ButtonProps;

describe('default', () => {
  beforeEach(() => {
    props = propObj.update;
  });

  it('updateの色は緑であること', () => {
    render(<Button {...props} />);
    expect(screen.getByTestId(baseId)).toHaveClass('bg-primary-700');
  });
});
