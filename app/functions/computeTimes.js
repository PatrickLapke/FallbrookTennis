import { addMinutes, parse } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export const computeTimes = (selectedDate, time, isSingles) => {
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

  let endTimeInCaTz = addMinutes(startTimeInCaTz, isSingles ? 60 : 90);

  const startTimeUtc = zonedTimeToUtc(startTimeInCaTz, CALIFORNIA_TIMEZONE);
  const endTimeUtc = zonedTimeToUtc(endTimeInCaTz, CALIFORNIA_TIMEZONE);

  console.log(startTimeUtc, endTimeUtc);
  return { startTime: startTimeUtc, endTime: endTimeUtc };
};
