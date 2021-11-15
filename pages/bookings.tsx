import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

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
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month()
  );

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
  }, [selectedMonth]);
  return (
    <div>
      {/* Month display */}
      <div></div>

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
    </div>
  );
}
