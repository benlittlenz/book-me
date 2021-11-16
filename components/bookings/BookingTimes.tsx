import { ExclamationIcon } from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

type AvailableTimesProps = {
  date: Dayjs;
  length: number;
};

type GetSlots = {
  inviteeDate: Dayjs;
  frequency: number;
};

type Boundary = {
  lowerBound: number;
  upperBound: number;
};

const freqApply = (cb: any, value: number, frequency: number): number =>
  cb(value / frequency) * frequency;

const inviteeBoundary = (
  startTime: number,
  utcOffset: number,
  frequency: number
): Boundary => {
  const upperBound: number = freqApply(Math.floor, 1440 - utcOffset, frequency);
  const lowerBound: number = freqApply(
    Math.ceil,
    startTime - utcOffset,
    frequency
  );
  return {
    lowerBound,
    upperBound
  };
};

const organizerBoundaries = (start: number, finish: number): any => {
  const boundaries: Boundary[] = [];
  const lowerBound: number = start - dayjs().utcOffset();
  const upperBound: number = finish - dayjs().utcOffset();

  boundaries.push({ lowerBound, upperBound });

  return boundaries;
};

const getSlotsBetweenBoundary = (
  frequency: number,
  { lowerBound, upperBound }: Boundary
) => {
  const slots: Dayjs[] = [];
  for (
    let minutes = 0;
    lowerBound + minutes <= upperBound - frequency;
    minutes += frequency
  ) {
    slots.push(
      dayjs()
        .startOf('d')
        .add(lowerBound + minutes, 'minutes')
    );
  }
  return slots;
};

const getSlots = ({ inviteeDate, frequency }: GetSlots) => {
  let x = {
    slotInterval: 30,
    openTime: '2021-10-10 9:00',
    closeTime: '2021-10-10 5:00'
  };
  let startTime = dayjs(x.openTime);
  let endTime = dayjs(x.closeTime)
  console.log('startTime', startTime);
  //Times
  let allTimes = [];

  //Loop over the times - only pushes time with 30 minutes interval
  while (startTime < endTime) {
    //Push times
    allTimes.push(startTime.format('HH:mm'));
    //Add interval of 30 minutes
    startTime.add(x.slotInterval, 'minutes');
  }

  console.log(allTimes);
};

const handleAvailableSlots = async (date: Dayjs, length: number) => {
  const times = getSlots({
    frequency: length,
    inviteeDate: date
  });

  console.log('TIMES', times);

  // Check for conflicts
  // for (let i = times.length - 1; i >= 0; i -= 1) {
  //   responseBody.busy.every((busyTime): boolean => {
  //     const startTime = dayjs(busyTime.start);
  //     const endTime = dayjs(busyTime.end);
  //     // Check if start times are the same
  //     if (times[i].isBetween(startTime, endTime, null, '[)')) {
  //       times.splice(i, 1);
  //     }
  //     // Check if slot end time is between start and end time
  //     else if (
  //       times[i].add(eventLength, 'minutes').isBetween(startTime, endTime)
  //     ) {
  //       times.splice(i, 1);
  //     }
  //     // Check if startTime is between slot
  //     else if (
  //       startTime.isBetween(times[i], times[i].add(eventLength, 'minutes'))
  //     ) {
  //       times.splice(i, 1);
  //     } else {
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  // // temporary
  // const user = res.url.substring(
  //   res.url.lastIndexOf('/') + 1,
  //   res.url.indexOf('?')
  // );
  // return times.map((time) => ({
  //   time,
  //   users: [user]
  // }));
};

export const AvailableTimes: FC<AvailableTimesProps> = ({ date, length }) => {
  const router = useRouter();
  handleAvailableSlots(date, length);
  return (
    <div className="sm:pl-4 mt-8 sm:mt-0 text-center sm:w-1/3 md:-mb-5">
      <div className="text-gray-600 font-light text-lg mb-4 text-left">
        <span className="w-1/2 dark:text-white text-gray-600">
          <strong>{date.format('dddd').toLowerCase()}</strong>
          <span className="text-gray-500">{date.format(', DD ')}</span>
        </span>
      </div>
      <div className="md:max-h-[364px] overflow-y-auto"></div>
    </div>
  );
};
