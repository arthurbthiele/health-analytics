import { Timeseries } from "../processData";
import React from "react";
import { DateTime } from "luxon";
import { getMaxChangeIndex } from "./getMaxChangeIndex";
import { getAnalytics, StatisticalSummary } from "./getAnalytics";
import { splitTimeseriesOnIndex } from "./splitTimeseriesOnIndex";
import { permutationTest } from "simple-statistics";

export interface SplitAnalytics {
  before: StatisticalSummary;
  after: StatisticalSummary;
  pValue?: string | null;
}

export function getSplitTimeseriesAnalytics(
  timeseries: Timeseries,
  setAnalyticsDate: React.Dispatch<React.SetStateAction<DateTime | null>>
): SplitAnalytics {
  const maxChangeIndex = getMaxChangeIndex(timeseries);
  if (!maxChangeIndex) {
    return {
      before: getAnalytics(timeseries),
      after: getAnalytics({ ...timeseries, dataSet: [] }),
    };
  }
  setAnalyticsDate(timeseries.dataSet[maxChangeIndex].x);
  const splitTimeseries = splitTimeseriesOnIndex(maxChangeIndex, timeseries);
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
