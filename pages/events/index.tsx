import { QueryClient, useQuery } from 'react-query';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState } from 'react-query/hydration';

import {
  ClockIcon,
  LocationMarkerIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';
import { supabase } from '../../utils/supabaseClient';
import { Spinner } from '@/components/ui/Elements';
import { ContentLayout } from '@/components/ui/Layout/ContentLayout';
import { CreateEvent } from '../../components/events';

export default function Events() {
  const eventsQuery = useQuery("events", fetchEvents);

  if (eventsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <ContentLayout title="Events">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
        <CreateEvent />
      </div>
      <div className="mt-12 w-full mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {eventsQuery.data?.map((event) => (
              <li key={event.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {event.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex w-8 h-8 border hover:border-gray-200 shadow-sm">
                        <Link href="/events/preview">
                        <a className="mx-auto my-auto">
                          <ExternalLinkIcon className="w-5 h-5 text-gray-400" />
                          </a>
                        </Link>
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
    </ContentLayout>
  );
}

const fetchEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('events', fetchEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
