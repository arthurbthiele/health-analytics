import React, { ReactElement, useState } from "react";
import { FileUploader } from "./FileUploader";
import { processData, TimeSeries } from "../utilities/processData";
import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { UploadData } from "../utilities/validateUpload";
import { DateInput } from "./DateInput";
import { GraphSelector } from "./GraphSelector";
import { RandomDataGenerator } from "./RandomDataGenerator";

export function DataContainer(): ReactElement {
  const [timeSeriesCollection, setTimeSeriesCollection] =
    useState<Record<string, TimeSeries>>();
  const [selectedTimeSeries, setSelectedTimeSeries] = useState<string>("");
  const [value, setValue] = React.useState<Date | null>(
    new Date("2020-08-18T21:11:54")
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  function onUpload(input: UploadData): void {
    setTimeSeriesCollection(processData(input));
  }
  function onDataGeneration(input: Record<string, TimeSeries>): void {
    setTimeSeriesCollection(input);
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FileUploader onUpload={onUpload} />
        <RandomDataGenerator onDataGeneration={onDataGeneration} />
        <DateInput handleChange={handleChange} value={value} />
      </div>
      {!!timeSeriesCollection && (
        <GraphSelector
          timeSeriesCollection={timeSeriesCollection}
          selectedTimeSeries={selectedTimeSeries}
          setSelectedTimeSeries={setSelectedTimeSeries}
        />
      )}
      {!!timeSeriesCollection && !!timeSeriesCollection[selectedTimeSeries] && (
        <TimeSeriesGraph
          timeSeries={timeSeriesCollection[selectedTimeSeries]}
        />
      )}
    </div>
  );
}
