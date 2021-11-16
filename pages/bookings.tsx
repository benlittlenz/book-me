// Get router variables
import BookingCalendar from '@/components/bookings/BookingCalendar';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CreditCardIcon,
  GlobeIcon
} from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function AvailabilityPage() {
  const router = useRouter();

  return (
    <>
      <div>
        <main
          className={
            'mx-auto my-0 md:my-24 transition-max-width ease-in-out duration-500 '
          }
        >
          <div className="bg-white border-gray-200 rounded-sm md:border">
            <div className="px-4 sm:flex sm:py-5 sm:p-4">
              <div
                className={
                  'hidden md:block pr-8 sm:border-r sm:w-1/2'
                }
              >
                <h2 className="font-medium text-gray-500 mt-3">
                  Joe Doe
                </h2>
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

              <BookingCalendar />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

