import React, { ReactElement } from "react";
import { HeartRateDatum } from "../utilities/processData";
import { Line } from "react-chartjs-2";

export function HeartRateGraph({
  heartRateData,
}: {
  heartRateData: HeartRateDatum[];
}): ReactElement {
  const state = {
    labels: heartRateData.map((datum) => datum.t),
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: heartRateData.map((datum) => datum.y),
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
            text: "Average Rainfall per month",
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
