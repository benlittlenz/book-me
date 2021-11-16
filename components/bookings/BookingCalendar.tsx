import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

type BookingProps = {
  date: Dayjs | null;
  onDatePicked: (day: Dayjs) => void;
};

export default function BookingCalendar({
  date,
  onDatePicked
}: BookingProps): JSX.Element {
  const [days, setDays] = useState<
    ({ disabled: boolean; date: number } | null)[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    (date || dayjs()).month()
  );

  const dateInvited = (): Dayjs => dayjs().month(selectedMonth);

  useEffect(() => {
    const firstWeekday = dateInvited().date(1).day();

    // Create empty placeholder array
    const days = Array(firstWeekday).fill(null);
    const daysInMonth = dateInvited().daysInMonth();

    const isBookable = (day: number) => {
      const date: Dayjs = dateInvited().date(day);
      return date.endOf('day').isBefore(dayjs());
    };

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ disabled: isBookable(i), date: i });
    }
    setDays(days);
  }, [selectedMonth]);

  const increaseMonth = () => {
    setSelectedMonth((selectedMonth ?? 0) + 1);
  };

  const decreaseMonth = () => {
    setSelectedMonth((selectedMonth ?? 0) - 1);
  };

  return (
    <div
      className={clsx(
        'mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:pl-4',
        date
          ? 'w-full sm:w-1/2 md:w-2/5 sm:border-r sm:pl-4 sm:pr-6 '
          : 'w-full sm:pl-4'
      )}
    >
      {/* Month display */}
      <div className="flex text-gray-600 font-light text-xl mb-4">
        <span className="w-1/2 text-gray-600 dark:text-white">
          <strong className="text-gray-900 dark:text-white">
            {dateInvited().format('MMMM')}
          </strong>{' '}
          <span className="text-gray-500">{dateInvited().format('YYYY')}</span>
        </span>
        <div className="w-1/2 text-right text-gray-600 dark:text-gray-400">
          <button
            onClick={decreaseMonth}
            className={clsx(
              'group mr-2 p-1',
              typeof selectedMonth === 'number' &&
                selectedMonth <= dayjs().month() &&
                'text-gray-400 dark:text-gray-600'
            )}
            disabled={
              typeof selectedMonth === 'number' &&
              selectedMonth <= dayjs().month()
            }
          >
            <ChevronLeftIcon className="group-hover:text-black dark:group-hover:text-white w-5 h-5" />
          </button>
          <button className="group p-1" onClick={increaseMonth}>
            <ChevronRightIcon className="group-hover:text-black dark:group-hover:text-white w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar display */}
      <div className="grid grid-cols-7 gap-4 text-center border-b border-t dark:border-gray-800 sm:border-0">
        {daysOfWeek.map((weekDay) => (
          <div
            key={weekDay}
            className="uppercase text-gray-500 text-xs tracking-widest my-4"
          >
            {weekDay.toLowerCase().substring(0, 3)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((day, idx) => (
          <div
            key={day === null ? `e-${idx}` : `day-${day.date}`}
            style={{
              paddingTop: '100%'
            }}
            className="w-full relative border border-gray-100"
          >
            {day === null ? (
              <div key={`e-${idx}`} />
            ) : (
              <button
                onClick={() => onDatePicked(dateInvited().date(day.date))}
                disabled={day.disabled}
                className={clsx(
                  'absolute w-full top-0 left-0 right-0 bottom-0 rounded-sm text-center mx-auto',
                  'hover:border hover:border-brand',
                  day.disabled
                    ? 'text-gray-400 font-light hover:border-0 cursor-default'
                    : 'dark:text-white text-primary-500 font-medium'
                )}
              >
                {day.date}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
