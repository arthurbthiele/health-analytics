import React, { ReactElement } from "react";
import { TimeSeries, TimeSeriesDatum } from "../utilities/processData";
import iterator from "@stdlib/random-iter-normal";
import { DateTime, Interval } from "luxon";
import { Button } from "@mui/material";

export function RandomDataGenerator({
  onDataGeneration,
}: {
  onDataGeneration: (input: Record<string, TimeSeries>) => void;
}): ReactElement {
  return (
    <Button onClick={() => onDataGeneration(generateRandomDataSet())}>
      Click me
    </Button>
  );
}

function generateRandomDataSet(): Record<string, TimeSeries> {
  const end = DateTime.now();
  const start = DateTime.now().minus({ days: 20 });
  const dates = days(Interval.fromDateTimes(start, end));
  const timeSeriesCollection: Record<string, TimeSeries> = {};
  for (const dataType of dataTypeStandardValues) {
    const it = iterator(dataType.statistics.mean, dataType.statistics.dev);
    const values: TimeSeriesDatum[] = dates.map((date) => ({
      x: date,
      y: it.next().value,
    }));
    timeSeriesCollection[dataType.name] = {
      type: dataType.name,
      unit: dataType.unit,
      dataSet: values,
    };
  }
  return timeSeriesCollection;
}

function days(interval: Interval): DateTime[] {
  let cursor = interval.start.startOf("day");
  const output: DateTime[] = [];
  while (cursor < interval.end) {
    output.push(cursor);
    cursor = cursor.plus({ days: 1 });
  }
  return output;
}

const dataTypeStandardValues: dataTypeGenerator[] = [
  { name: "Height", unit: "cm", statistics: { mean: 180, dev: 0.01 } },
  { name: "Body Mass", unit: "kg", statistics: { mean: 70, dev: 2 } },
  { name: "Heart Rate", unit: "count/min", statistics: { mean: 70, dev: 15 } },
  { name: "Step Count", unit: "count", statistics: { mean: 1000, dev: 100 } },
  {
    name: "Distance Walking Running",
    unit: "km",
    statistics: { mean: 1, dev: 0.3 },
  },
  {
    name: "Basal Energy Burned",
    unit: "kJ",
    statistics: { mean: 300, dev: 10 },
  },
  {
    name: "Active Energy Burned",
    unit: "kJ",
    statistics: { mean: 200, dev: 20 },
  },
  {
    name: "Flights Climbed",
    unit: "count",
    statistics: { mean: 4, dev: 1 },
  },
  {
    name: "Apple Exercise Time",
    unit: "min",
    statistics: { mean: 1, dev: 0.01 },
  },
  {
    name: "Resting Heart Rate",
    unit: "count/min",
    statistics: { mean: 60, dev: 10 },
  },
  {
    name: "VO2Max",
    unit: "mL/min·kg",
    statistics: { mean: 1, dev: 2 },
  },
  {
    name: "Walking Heart Rate Average",
    unit: "count/min",
    statistics: { mean: 100, dev: 15 },
  },
  {
    name: "Environmental Audio Exposure",
    unit: "dBASPL",
    statistics: { mean: 70, dev: 5 },
  },
  {
    name: "Headphone Audio Exposure",
    unit: "dBASPL",
    statistics: { mean: 65, dev: 10 },
  },
  {
    name: "Walking Double Support Percentage",
    unit: "%",
    statistics: { mean: 0.28, dev: 0.02 },
  },
  {
    name: "Six Minute Walk Test Distance",
    unit: "m",
    statistics: { mean: 500, dev: 1 },
  },
  {
    name: "Apple Stand Time",
    unit: "min",
    statistics: { mean: 3.5, dev: 0.5 },
  },
  {
    name: "Walking Speed",
    unit: "km/hr",
    statistics: { mean: 4, dev: 1 },
  },
  {
    name: "Walking Step Length",
    unit: "cm",
    statistics: { mean: 65, dev: 8 },
  },
  {
    name: "Walking Asymmetry Percentage",
    unit: "%",
    statistics: { mean: 0.2, dev: 0.01 },
  },
  {
    name: "Stair Ascent Speed",
    unit: "m/s",
    statistics: { mean: 0.4, dev: 0.06 },
  },
  {
    name: "Stair Descent Speed",
    unit: "m/s",
    statistics: { mean: 0.5, dev: 0.06 },
  },
  {
    name: "Sleep Duration Goal",
    unit: "hr",
    statistics: { mean: 7.5, dev: 0.2 },
  },
  {
    name: "Heart Rate Variability SDNN",
    unit: "ms",
    statistics: { mean: 80, dev: 15 },
  },
];

interface dataTypeGenerator {
  name: string;
  unit: string;
  statistics: {
    mean: number;
    dev: number;
  };
}
