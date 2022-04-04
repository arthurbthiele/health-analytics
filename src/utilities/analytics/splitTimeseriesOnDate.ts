import { DateTime } from "luxon";
import { Timeseries } from "../processData";

export interface SplitTimeseries {
  before: Timeseries;
  after: Timeseries;
}

export function splitTimeseriesOnDate(
  inputDate: DateTime,
  timeseries: Timeseries
): SplitTimeseries {
  const dataSet = timeseries.dataSet;
  if (dataSet.length === 0) {
    return {
      before: timeseries,
      after: timeseries,
    };
  }
  if (dataSet[0].x.diff(inputDate).milliseconds > 0) {
    return {
      before: {
        ...timeseries,
        dataSet: [],
      },
      after: timeseries,
    };
  }
  if (dataSet[dataSet.length - 1].x.diff(inputDate).milliseconds < 0) {
    return {
      before: timeseries,
      after: {
        ...timeseries,
        dataSet: [],
      },
    };
  }

  const splitIndex = dataSet.findIndex(
    (timeseriesDatum) => timeseriesDatum.x.diff(inputDate).milliseconds > 0
  );
  const nonDataSetParams = {
    type: timeseries.type,
    unit: timeseries.unit,
  };
  const beforeTimeseries = {
    ...nonDataSetParams,
    dataSet: timeseries.dataSet.slice(0, splitIndex),
  };
  const afterTimeseries = {
    ...nonDataSetParams,
    dataSet: timeseries.dataSet.slice(splitIndex),
  };
  return {
    before: beforeTimeseries,
    after: afterTimeseries,
  };
}
