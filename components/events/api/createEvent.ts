import { QueryClient, useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '../../../utils/supabaseClient';
import { useNotificationStore } from "../../../stores/notification"

export type CreateEvent = {
  data: {
    id: string;
    title: string;
    slug: string;
    description?: string
    length?: number;
  };
};

export const createEvent = async (data: CreateEvent) => {
  console.log("DATA>>>>> ", data)
  const res = await supabase.from('events').insert({ id: uuidv4(), ...data });
  console.log('res', res)

  return res
};

export const useCreateEvent = () => {
  const { addNotification } = useNotificationStore();

  const queryClient = new QueryClient();
  return useMutation({
    onMutate: async (newEvent: any) => {
      await queryClient.cancelQueries('events');

      const previousEvents = queryClient.getQueryData('events') as any;

      queryClient.setQueryData('events', [
        ...(previousEvents || []),
        newEvent?.data
      ]);

      return { previousEvents };
    },
    onError: (_, __, context: any) => {
      if (context?.previousEvents) {
        queryClient.setQueryData('events', context.previousEvents);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('events');
      console.log("SUCCESS", data)
      addNotification({
        type: 'success',
        title: 'Event Successfully Created'
      });
    },
    mutationFn: createEvent
  });
};
