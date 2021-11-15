import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import {
  ClockIcon,
  LocationMarkerIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';
import { supabase } from '../../utils/supabaseClient';
import { Spinner } from '@/components/Elements';

const fetchEvents = async () => {
  // SupabaseClient
  const { data, error } = await supabase.from('events').select('*');

  return data;
};

const queryClient = new QueryClient();

export const getServerSideProps = async () => {
  await queryClient.prefetchQuery('events', fetchEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default function Events(): JSX.Element {
  const { data, isLoading } = useQuery('events', fetchEvents);

  if(isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="mt-12 w-11/12 mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.map((event) => (
            <li key={event.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {event.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex w-8 h-8 border hover:border-gray-200 shadow-sm">
                      <div className="mx-auto my-auto">
                        <ExternalLinkIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <ClockIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.duration}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
