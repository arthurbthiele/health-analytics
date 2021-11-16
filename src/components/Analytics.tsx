import React, { ReactElement } from "react";
import { Timeseries } from "../utilities/processData";
import { DateTime } from "luxon";
import {
  mean,
  permutationTest,
  sampleStandardDeviation,
} from "simple-statistics";

export function Analytics({
  timeseries,
  analyticsDate,
}: {
  timeseries: Timeseries;
  analyticsDate: DateTime;
}): ReactElement {
  const output = getSplitTimeseriesAnalytics(timeseries, analyticsDate);
  return (
    <div>
      Before: Count: {output.before.count} <br />
      Average: {output.before.average} <br />
      Deviation: {output.before.deviation} <br />
      After: Count: {output.after.count} <br />
      Average: {output.after.average} <br />
      Deviation: {output.after.deviation} <br />
      {output.after.average && output.before.average && (
        <div>
          Overall Difference: {output.after.average - output.before.average}{" "}
          <br />
          This difference has a p-value of: {output.pValue}
        </div>
      )}
    </div>
  );
}

function getAnalytics(timeseries: Timeseries): StatisticalSummary {
  const count = timeseries.dataSet.length;
  if (count === 0) {
    return {
      count: 0,
    };
  }
  const average = mean(timeseries.dataSet.map((datum) => datum.y));
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

function getSplitTimeseriesAnalytics(
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
