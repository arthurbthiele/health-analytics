import { Timeseries } from "../processData";
import { mean, sampleStandardDeviation } from "simple-statistics";

export function getAnalytics(timeseries: Timeseries): StatisticalSummary {
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
