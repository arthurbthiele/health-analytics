import React, { ReactElement } from "react";
import { Timeseries } from "../utilities/processData";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { SplitAnalytics } from "../utilities/analyticsHelpers";

export interface ChartDataSet {
  label?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  data: { x: number; y: number }[];
}

export function TimeseriesGraph({
  timeseries,
  analyticsDate,
  analytics,
}: {
  timeseries: Timeseries;
  analyticsDate: DateTime | null;
  analytics: SplitAnalytics | undefined;
}): ReactElement {
  const state: {
    labels: number[];
    datasets: ChartDataSet[];
  } = {
    labels: timeseries.dataSet.map((datum) => datum.x.toMillis()),
    datasets: [
      {
        label: timeseries.type,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: timeseries.dataSet.map((element) => ({
          x: element.x.toMillis(),
          y: element.y,
        })),
      },
    ],
  };

  if (
    analyticsDate &&
    (analytics?.before?.count ?? 0 > 0) &&
    (analytics?.after?.count ?? 0 > 0)
  ) {
    const dateLine = getAnalyticsDateLine(analyticsDate, timeseries);
    const priorAverageLine = getPriorAverageLine(
      analyticsDate,
      timeseries,
      analytics
    );
    const postAverageLine = getPostAverageLine(
      analyticsDate,
      timeseries,
      analytics
    );
    state.datasets.push(dateLine, priorAverageLine, postAverageLine);
  }

  return (
    <Line
      data={state}
      options={
        {
          onHover: null,
          parsing: false,
          plugins: {
            decimation: {
              enabled: true,
              algorithm: "lttb",
              samples: 1000,
            },
          },
          title: {
            display: true,
            text: timeseries.type,
          },
          legend: {
            display: true,
            position: "right",
          },
          scales: {
            x: {
              type: "time",
              display: true,
              title: {
                display: true,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: timeseries.unit,
              },
            },
          },
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    />
  );
}

function getAnalyticsDateLine(
  analyticsDate: DateTime,
  timeseries: Timeseries
): ChartDataSet {
  return {
    label: "Analytics Date",
    ...colorProps,
    data: [
      {
        x: analyticsDate.toMillis(),
        y: Math.max(...timeseries.dataSet.map((element) => element.y)),
      },
      {
        x: analyticsDate.toMillis(),
        y: Math.min(...timeseries.dataSet.map((element) => element.y)),
      },
    ],
  };
}

function getPriorAverageLine(
  analyticsDate: DateTime,
  timeseries: Timeseries,
  analytics: SplitAnalytics | undefined
): ChartDataSet {
  return {
    label: "Average Before",
    ...colorProps,
    data: [
      {
        x: timeseries.dataSet[0].x.toMillis(),
        y: analytics?.before.average ?? 0,
      },
      {
        x: analyticsDate.toMillis(),
        y: analytics?.before.average ?? 0,
      },
    ],
  };
}

function getPostAverageLine(
  analyticsDate: DateTime,
  timeseries: Timeseries,
  analytics: SplitAnalytics | undefined
): ChartDataSet {
  return {
    label: "Average After",
    ...colorProps,
    data: [
      {
        x: analyticsDate.toMillis(),
        y: analytics?.after.average ?? 0,
      },
      {
        x: timeseries.dataSet[timeseries.dataSet.length - 1].x.toMillis(),
        y: analytics?.after.average ?? 0,
      },
    ],
  };
}

const colorProps = {
  borderColor: "rgba(255,0,0,0.5)",
  backgroundColor: "rgba(255,0,0,0.5)",
};
