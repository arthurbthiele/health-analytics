import { Timeseries } from "../processData";
import React from "react";
import { DateTime } from "luxon";
import { getMaxChangeDate } from "./getMaxChangeDate";
import { getAnalytics, StatisticalSummary } from "./getAnalytics";
import { splitTimeseriesOnDate } from "./splitTimeseriesOnDate";
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
