// Get router variables
import { BookingCalendar, AvailableTimes} from '../../components/bookings';
import { ClockIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function EventPreview() {
  const router = useRouter();

  const selectedDate = useMemo(() => {
    const dateString = router.query.date as string;
    if (dateString) {
      const date = dayjs(dateString.substr(0, 10));
      return date.isValid() ? date : null;
    }
    return null;
  }, [router.query.date]);

  const changeDate = (newDate: Dayjs) => {
    router.replace(
      {
        query: {
          ...router.query,
          date: newDate.format('YYYY-MM-DDZZ')
        }
      },
      undefined,
      {
        shallow: true
      }
    );
  };

  return (
    <>
      <div>
        <main
          className={clsx(
            'mx-auto my-0 md:my-24',
            selectedDate ? 'max-w-6xl' : 'max-w-4xl'
          )}
        >
          <div className="bg-white border-gray-200 rounded-sm md:border">
            <div className="px-4 sm:flex sm:py-5 sm:p-4">
              <div
                className={clsx(
                  'hidden md:block pr-8 sm:border-r sm:w-1/2',
                  selectedDate ? 'sm:w-1/3' : 'sm:w-1/2'
                )}
              >
                <h2 className="font-medium text-gray-500 mt-3">Joe Doe</h2>
                <h1 className="font-cal mb-4 text-3xl font-semibold text-gray-800">
                  60 Minute interview
                </h1>
                <p className="px-2 py-1 mb-1 -ml-2 text-gray-500">
                  <ClockIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                  60 Mins
                </p>

                <p className="mt-3 mb-8 text-gray-600">
                  Interview with joe doe
                </p>
              </div>
              <BookingCalendar date={selectedDate} onDatePicked={changeDate} />
              {selectedDate && (
                <AvailableTimes date={selectedDate} length={60} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
