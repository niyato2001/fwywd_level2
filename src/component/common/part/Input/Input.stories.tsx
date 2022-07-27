import type { ComponentMeta, Story } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { propObj } from './Input.props';
import { Input, InputProps } from './';

export default {
  title: 'Common/part/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: Story<InputProps> = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Input {...args} />
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = propObj.default;
