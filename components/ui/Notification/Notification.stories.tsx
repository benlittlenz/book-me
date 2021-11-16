import { Meta, Story } from '@storybook/react';

import { Notification, NotificationProps } from './Notification';

const meta: Meta = {
  title: 'Components/Notifications',
  component: Notification,
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;

const Template: Story<NotificationProps> = (props) => (
  <Notification {...props} />
);

export const Info = Template.bind({});
Info.args = {
  notification: {
    id: '1',
    type: 'info',
    title: 'Info alert',
    message: 'This is a info alert'
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`)
};
export const Success = Template.bind({});
Success.args = {
  notification: {
    id: '1',
    type: 'success',
    title: 'Success Alert',
    message: 'This is success alert'
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`)
};
export const Warning = Template.bind({});
Warning.args = {
  notification: {
    id: '1',
    type: 'warning',
    title: 'Warning alert',
    message: 'This is warning alert'
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`)
};
export const Error = Template.bind({});
Error.args = {
  notification: {
    id: '1',
    type: 'error',
    title: 'Alert error',
    message: 'Error alert'
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`)
};
