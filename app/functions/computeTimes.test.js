import { utcToZonedTime, zonedTimeToUtc, parseISO } from "date-fns-tz";
import { format, addMinutes } from "date-fns";
import { computeTimes } from "./computeTimes";

const createFixedTimeDate = (hours, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return utcToZonedTime(date, "America/Los_Angeles");
};

describe("computeTimes", () => {
  it("Should correctly compute start time and end time in UTC for singles", () => {
    const selectedDate = format(new Date(), "MM/dd");

    const time = createFixedTimeDate(7, 0);
    const timeValue = { value: time };

    const isSingles = true;

    const result = computeTimes(selectedDate, timeValue, isSingles);

    console.log(result);
  });
});
