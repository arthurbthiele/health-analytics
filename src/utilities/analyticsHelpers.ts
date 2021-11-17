import { DateTime } from "luxon";
import { Timeseries } from "./processData";
import {
  mean,
  permutationTest,
  sampleStandardDeviation,
} from "simple-statistics";

function getAnalytics(timeseries: Timeseries): StatisticalSummary {
  const count = timeseries.dataSet.length;
  if (count === 0) {
    return {
      count,
    };
  }

  const average = mean(timeseries.dataSet.map((datum) => datum.y));
  if (count === 1) {
    return {
      count,
      average,
    };
  }
  const deviation = sampleStandardDeviation(
    timeseries.dataSet.map((datum) => datum.y)
  );
  return { count, average, deviation };
}

export interface StatisticalSummary {
  count: number;
  average?: number;
  deviation?: number;
}

export interface SplitTimeseries {
  before: Timeseries;
  after: Timeseries;
}

export interface SplitAnalytics {
  before: StatisticalSummary;
  after: StatisticalSummary;
  pValue?: number | null;
}

function splitTimeseriesOnDate(
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

export function getSplitTimeseriesAnalytics(
  timeseries: Timeseries,
  splitDate: DateTime
): SplitAnalytics {
  const splitTimeseries = splitTimeseriesOnDate(splitDate, timeseries);
  const before = getAnalytics(splitTimeseries.before);
  const after = getAnalytics(splitTimeseries.after);
  const hypothesis =
    before.average && after.average
      ? before.average < after.average
        ? "less"
        : "greater"
      : undefined;

  if (!before.average || !after.average) {
    return {
      before,
      after,
    };
  }
  const pValue = permutationTest(
    splitTimeseries.before.dataSet.map((datum) => datum.y),
    splitTimeseries.after.dataSet.map((datum) => datum.y),
    hypothesis
  );
  return {
    before,
    after,
    pValue,
  };
}
