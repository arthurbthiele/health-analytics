import React, { ReactElement } from "react";
import { TimeSeries } from "../utilities/processData";
import { Line } from "react-chartjs-2";

export function TimeSeriesGraph({
  timeSeries,
}: {
  timeSeries: TimeSeries;
}): ReactElement {
  const state = {
    labels: timeSeries.dataSet.map((datum) => datum.t),
    datasets: [
      {
        label: timeSeries.type,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: timeSeries.dataSet.map((datum) => datum.y),
      },
    ],
  };
  return (
    <Line
      data={state}
      options={
        {
          title: {
            display: true,
            text: timeSeries.type,
          },
          legend: {
            display: true,
            position: "right",
          },
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    />
  );
}
