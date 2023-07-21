import { addHours, parse } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export const computePickleballTimes = (selectedDate, time, selectedHours) => {
  const CALIFORNIA_TIMEZONE = "America/Los_Angeles";
  let dateInLocalTz = parse(selectedDate, "MM/dd", new Date());

  const dateInCaTz = utcToZonedTime(dateInLocalTz, CALIFORNIA_TIMEZONE);

  const startTimeInCaTz = new Date(
    dateInCaTz.getFullYear(),
    dateInCaTz.getMonth(),
    dateInCaTz.getDate(),
    time.value.getHours(),
    time.value.getMinutes()
  );

  let endTimeInCaTz = addHours(startTimeInCaTz, selectedHours);

  const startTimeUtc = zonedTimeToUtc(startTimeInCaTz, CALIFORNIA_TIMEZONE);
  const endTimeUtc = zonedTimeToUtc(endTimeInCaTz, CALIFORNIA_TIMEZONE);

  return { startTime: startTimeUtc, endTime: endTimeUtc };
};
