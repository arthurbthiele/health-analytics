import React, { ReactElement } from "react";
import { Timeseries, TimeseriesDatum } from "../utilities/processData";
import iterator from "@stdlib/random-iter-normal";
import { DateTime, Interval } from "luxon";
import { dataTypeStandardValues } from "../assets/standardDataTypes";
import { Box } from "@mui/material";
import { Text } from "./Text";

export function RandomDataGenerator({
  onDataGeneration,
}: {
  onDataGeneration: (input: Record<string, Timeseries>) => void;
}): ReactElement {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        bgcolor: "background.paper",
        borderColor: "text.primary",
        m: 1,
        border: 1,
        width: 180,
      }}
      onClick={() => onDataGeneration(generateRandomDataSet())}
    >
      <Text style={{ padding: "5px" }}>Generate Random Data</Text>
    </Box>
  );
}

function generateRandomDataSet(): Record<string, Timeseries> {
  const end = DateTime.now();
  const start = DateTime.now().minus({ days: 200 });
  const dates = days(Interval.fromDateTimes(start, end));
  const timeseriesCollection: Record<string, Timeseries> = {};
  for (const dataType of dataTypeStandardValues) {
    const it = iterator(dataType.statistics.mean, dataType.statistics.dev);
    const values: TimeseriesDatum[] = dates.map((date) => ({
      x: date,
      y: it.next().value,
    }));
    timeseriesCollection[dataType.name] = {
      type: dataType.name,
      unit: dataType.unit,
      dataSet: values,
    };
  }
  return timeseriesCollection;
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
