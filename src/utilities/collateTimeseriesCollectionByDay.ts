import { Timeseries, TimeseriesDatum } from "./processData";
import { daysInInterval } from "./daysInInterval";
import { Interval } from "luxon";
import { sum } from "simple-statistics";

export function collateTimeseriesCollectionByDay(
  timeseriesCollection: Record<string, Timeseries>
): Record<string, Timeseries> {
  for (const timeseriesName in timeseriesCollection) {
    if (timeseriesToCollate.includes(timeseriesName)) {
      console.log(timeseriesName);
      timeseriesCollection[timeseriesName] = collateTimeseries(
        timeseriesCollection[timeseriesName]
      );
    }
  }
  return timeseriesCollection;
}

function collateTimeseries(timeseries: Timeseries): Timeseries {
  const startTime = timeseries.dataSet[0].x;
  const endTime = timeseries.dataSet[timeseries.dataSet.length - 1].x;
  const dates = daysInInterval(Interval.fromDateTimes(startTime, endTime));
  const collatedDataSet: TimeseriesDatum[] = [];
  let startDateIndex = 0;
  let endDateIndex = 0;

  for (const date of dates) {
    while (timeseries.dataSet[startDateIndex].x < date) {
      startDateIndex += 1;
    }
    const dayAfter = date.plus({ days: 1 });
    while (
      !!timeseries.dataSet[endDateIndex] &&
      timeseries.dataSet[endDateIndex].x < dayAfter
    ) {
      endDateIndex += 1;
    }

    const todaysDatums = timeseries.dataSet.slice(startDateIndex, endDateIndex);

    collatedDataSet.push({
      x: date,
      y: sum(todaysDatums.map((element) => element.y)),
    });
  }
  return { ...timeseries, dataSet: collatedDataSet };
}

const timeseriesToCollate = [
  "Step Count",
  "Distance Walking Running",
  "Basal Energy Burned",
  "Active Energy Burned",
  "Flights Climbed",
];
