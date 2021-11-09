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
  // const [lifestyleChangeDate, setLifestyleChangeDate] = useState<
  //   moment.Moment | undefined
  // >(undefined);

  function onUpload(input: UploadData): void {
    setTimeSeriesCollection(processData(input));
  }
  function onDataGeneration(input: Record<string, TimeSeries>): void {
    setTimeSeriesCollection(input);
  }

  return (
    <div>
      <FileUploader onUpload={onUpload} />
      <DateInput />
      <RandomDataGenerator onDataGeneration={onDataGeneration} />
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
