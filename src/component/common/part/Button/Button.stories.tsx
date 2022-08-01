import type { ComponentMeta, Story } from '@storybook/react';

import { propObj } from './Button.props';
import { Button, ButtonProps } from './';

export default {
  title: 'Common/part/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = propObj.update;
