import { addMinutes, parse, setHours, setMinutes } from "date-fns";

export const computeTimes = (selectedDate, time, isSingles) => {
  let date = parse(selectedDate, "MM/dd", new Date());
  let startTime = setHours(
    setMinutes(date, time.value.getUTCMinutes()),
    time.value.getUTCHours()
  );
  let startTimeCopy = new Date(startTime.getTime());
  const endTime = addMinutes(startTimeCopy, isSingles ? 60 : 90);

  return { startTime, endTime };
};
//2023-06-17T07:00:00.000Z 2023-06-17T08:00:00.000Z
