import { DateTime } from "luxon";
import { Timeseries } from "./processData";
import {
  mean,
  permutationTest,
  sampleStandardDeviation,
} from "simple-statistics";
import React from "react";

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
  pValue?: string | null;
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
  setAnalyticsDate: React.Dispatch<React.SetStateAction<DateTime | null>>
): SplitAnalytics {
  const maxChangeDate = getMaxChangeDate(timeseries);
  if (!maxChangeDate) {
    return {
      before: getAnalytics(timeseries),
      after: getAnalytics({ ...timeseries, dataSet: [] }),
    };
  }
  setAnalyticsDate(maxChangeDate);
  const splitTimeseries = splitTimeseriesOnDate(maxChangeDate, timeseries);
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
  const pValueOutput = pValue < 0.0001 ? "<0.0001" : pValue.toString();
  return {
    before,
    after,
    pValue: pValueOutput,
  };
}

function getMaxChangeDate(timeseries: Timeseries): DateTime | undefined {
  let sum = 0;
  if (timeseries.dataSet.length < 40) {
    return undefined;
  }
  timeseries.dataSet.forEach((element) => {
    sum = sum + element.y;
  });

  const differenceInAverages: number[] = [];
  let runningSum = 0;
  timeseries.dataSet.forEach((value, index) => {
    runningSum += value.y;
    const averageBefore = runningSum / (index + 1);
    const averageAfter =
      (sum - runningSum) / (timeseries.dataSet.length - index - 1);
    differenceInAverages.push(Math.abs(averageAfter - averageBefore));
  });
  const edgeOffset = 20;
  let max = 0;
  let maxIndex = 0;
  differenceInAverages
    .slice(edgeOffset, differenceInAverages.length - edgeOffset)
    .forEach((value, index) => {
      if (value > max) {
        maxIndex = index;
        max = value;
      }
    });
  return timeseries.dataSet[maxIndex + edgeOffset].x;
}
