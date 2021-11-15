import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import clsx from 'clsx';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function BookingCalendar(): JSX.Element {
  const [days, setDays] = useState<
    ({ disabled: boolean; date: number } | null)[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());

  const dateInvited = (): Dayjs => dayjs().month(selectedMonth);

  useEffect(() => {
    const firstWeekday = dateInvited().date(1).day();

    // Create empty placeholder array
    const days = Array(firstWeekday).fill(null);
    const daysInMonth = dateInvited().daysInMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ disabled: false, date: i });
    }

    console.log('DAYS >>>', days);
    setDays(days);
  }, [selectedMonth]);

  const incrementMonth = () => {
    setSelectedMonth((selectedMonth ?? 0) + 1);
  };

  const decrementMonth = () => {
    setSelectedMonth((selectedMonth ?? 0) - 1);
  };

  return (
    <div>
      {/* Month display */}
      <div>
        <span className="w-1/2 text-gray-600 dark:text-white">
          <strong className="text-gray-900 dark:text-white">
            {dateInvited().format('MMMM').toLowerCase()}
          </strong>{' '}
          <span className="text-gray-500">{dateInvited().format('YYYY')}</span>
        </span>
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
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, idx) => (
          <div
            key={day === null ? `e-${idx}` : `day-${day.date}`}
            style={{
              paddingTop: '100%'
            }}
            className="w-full relative"
          >
            {day === null ? (
              <div key={`e-${idx}`} />
            ) : (
              <button
                className={clsx(
                  'absolute w-full top-0 left-0 right-0 bottom-0 rounded-sm text-center mx-auto',
                  'hover:border hover:border-brand dark:hover:border-white',
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
