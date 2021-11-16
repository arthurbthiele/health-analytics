import React, { ReactElement } from "react";
import { Timeseries } from "../utilities/processData";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";

export function TimeseriesGraph({
  timeseries,
}: {
  timeseries: Timeseries;
}): ReactElement {
  const state = {
    labels: timeseries.dataSet.map((datum) => datum.x),
    datasets: [
      {
        label: timeseries.type,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: timeseries.dataSet.map((element) => element.y),
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
