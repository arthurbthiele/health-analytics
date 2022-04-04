import { Timeseries } from "../../processData";
import { DateTime, Interval } from "luxon";
import { daysInInterval } from "../../daysInInterval";
import { getMaxChangeIndex } from "../getMaxChangeIndex";

describe("getMaxChangeIndex", () => {
  it("should return undefined when there are less than 40 data points", () => {
    const shortConstantTimeseries: Timeseries = {
      type: "Height",
      unit: "m",
      dataSet: successiveDaysFromDate(17, DateTime.now()).map((date) => ({
        x: date,
        y: 1.8,
      })),
    };

    expect(getMaxChangeIndex(shortConstantTimeseries)).toBeUndefined();
  });
  it("should return the latest date within the edge offset of 20 when passed a constant dataset", () => {
    const longConstantTimeseries: Timeseries = {
      type: "Height",
      unit: "m",
      dataSet: successiveDaysFromDate(300, DateTime.now()).map((date) => ({
        x: date,
        y: 1.8,
      })),
    };

    expect(getMaxChangeIndex(longConstantTimeseries)).toEqual(280);
  });
  it("should find the boundary when the dataset changes at a point", () => {
    const suddenChangeTimeseries: Timeseries = {
      type: "Height",
      unit: "m",
      dataSet: successiveDaysFromDate(120, DateTime.now())
        .map((date) => ({ x: date, y: 1.8 }))
        .concat(
          successiveDaysFromDate(180, DateTime.now().plus({ days: 120 })).map(
            (date) => ({ x: date, y: 2 })
          )
        ),
    };
    expect(getMaxChangeIndex(suddenChangeTimeseries)).toEqual(120);
  });
  it("should find the boundary in a gradually changing dataset with a sudden discontinuity", () => {
    let offset = 0;
    const suddenChangeTimeseries: Timeseries = {
      type: "Height",
      unit: "m",
      dataSet: successiveDaysFromDate(100, DateTime.now())
        .map((date) => {
          offset += 0.01;
          return { x: date, y: 1.8 + offset };
        })
        .concat(
          successiveDaysFromDate(350, DateTime.now().plus({ days: 100 })).map(
            (date) => {
              offset += 0.01;
              return { x: date, y: 2 + offset };
            }
          )
        ),
    };
    expect(getMaxChangeIndex(suddenChangeTimeseries)).toEqual(100);
  });
});

function successiveDaysFromDate(days: number, date: DateTime): DateTime[] {
  return daysInInterval(Interval.fromDateTimes(date, date.plus({ days })));
}
