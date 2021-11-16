import dayjs, { Dayjs } from "dayjs";


type GetSlots = {
  inviteeDate: Dayjs;
  frequency: number;
};

const getSlots = ({
  inviteeDate,
  frequency
}: GetSlots): Dayjs[] => {
  const currentDate = dayjs(inviteeDate);

  const startTime = currentDate.isAfter(inviteeDate)
    ? // block out everything when inviteeDate is less than startDate
      currentDate.diff(inviteeDate, "day") > 0
      ? 1440
      : currentDate.hour() * 60 + currentDate.minute()
    : 0;

    return []

  // const inviteeBounds = inviteeBoundary(startTime, inviteeDate.utcOffset(), frequency);

  // return getOverlaps(
  //   inviteeBounds,
  //   organizerBoundaries(workingHours, inviteeDate, inviteeBounds, organizerTimeZone)
  // )
  //   .reduce((slots, boundary: Boundary) => [...slots, ...getSlotsBetweenBoundary(frequency, boundary)], [])
  //   .map((slot) =>
  //     slot.utcOffset(inviteeDate.utcOffset()).month(inviteeDate.month()).date(inviteeDate.date())
  //   );
};

export default getSlots;
