import { Timeseries } from "../processData";

export interface SplitTimeseries {
  before: Timeseries;
  after: Timeseries;
}

export function splitTimeseriesOnIndex(
  splitIndex: number,
  timeseries: Timeseries
): SplitTimeseries {
  const dataSet = timeseries.dataSet;
  if (dataSet.length === 0) {
    return {
      before: timeseries,
      after: timeseries,
    };
  }

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
