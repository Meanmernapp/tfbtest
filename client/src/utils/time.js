// timeUtils.js
import { format, fromZonedTime, toZonedTime } from "date-fns-tz";

const PACIFIC_TIME_ZONE = "America/Los_Angeles";

export const formatToPacificTime = (date) => {
  const zonedDate = toZonedTime(date, PACIFIC_TIME_ZONE);
  return format(zonedDate, "yyyy-MM-dd HH:mm:ss", {
    timeZone: PACIFIC_TIME_ZONE,
  });
};

export const convertToPacificTime = (date) => {
  return toZonedTime(date, PACIFIC_TIME_ZONE).setHours(0, 0, 0, 0);
};

export const convertFromPacificTime = (dateStr) => {
  const zonedDate = fromZonedTime(dateStr, PACIFIC_TIME_ZONE);
  return zonedDate;
};
