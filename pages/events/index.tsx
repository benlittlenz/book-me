import {
  ClockIcon,
  CalendarIcon,
  LocationMarkerIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';

const positions = [
  {
    id: 1,
    title: 'Interviews',
    duration: '20 min',
    location: 'In Person',
    description: 'Engineering'
  },
  {
    id: 2,
    title: 'Interviews 2',
    duration: '15 min',
    location: 'Zoom',
    description: 'Engineering'
  },
  {
    id: 3,
    title: 'Interviews 3',
    duration: '60 mins',
    location: 'Zoom',
    description: 'Engineering'
  }
];

export default function Events(): JSX.Element {
  console.log('EVENT PAGE');

  return (
    <div className="mt-12 w-11/12 mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {positions.map((position) => (
            <li key={position.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {position.title}
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
                        {position.duration}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {position.location}
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
