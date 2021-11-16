/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { v4 as uuidv4 } from 'uuid';

import { useNotificationStore, Notification } from '../notification';

test('should add and remove notifications', () => {
  const { result } = renderHook(() => useNotificationStore());

  expect(result.current.notifications.length).toBe(0);

  const notification: Notification = {
    id: uuidv4(),
    title: 'Test Notification',
    type: 'info',
    message: 'This is just a test',
  };

  act(() => {
    result.current.addNotification(notification);
  });

  expect(result.current.notifications).toContainEqual(notification);

  act(() => {
    result.current.dismissNotification(notification.id);
  });

  expect(result.current.notifications).not.toContainEqual(notification);
});
