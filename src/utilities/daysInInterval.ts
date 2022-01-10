import { DateTime, Interval } from "luxon";

export function daysInInterval(interval: Interval): DateTime[] {
  let cursor = interval.start.startOf("day");
  const output: DateTime[] = [];
  while (cursor < interval.end) {
    output.push(cursor);
    cursor = cursor.plus({ days: 1 });
  }
  return output;
}
