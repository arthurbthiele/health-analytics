import React, { ReactElement, useState } from "react";
import { FileUploader } from "./FileUploader";
import { processData, Timeseries } from "../utilities/processData";
import { UploadData } from "../utilities/validateUpload";
import { DateInput } from "./DateInput";
import { GraphSelector } from "./GraphSelector";
import { RandomDataGenerator } from "./RandomDataGenerator";
import { DateTime } from "luxon";
import { Analytics } from "./Analytics";
import { TimeseriesGraph } from "./TimeseriesGraph";

export function DataContainer(): ReactElement {
  const [timeseriesCollection, setTimeseriesCollection] =
    useState<Record<string, Timeseries>>();
  const [selectedTimeseries, setSelectedTimeseries] = useState<string>("");
  const [analyticsDate, setAnalyticsDate] = React.useState<DateTime | null>(
    DateTime.now()
  );

  const handleChange = (newValue: Date | null) => {
    if (!!newValue) {
      setAnalyticsDate(DateTime.fromJSDate(newValue));
    }
  };
  function onUpload(input: UploadData): void {
    setTimeseriesCollection(processData(input));
  }
  function onDataGeneration(input: Record<string, Timeseries>): void {
    setTimeseriesCollection(input);
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FileUploader onUpload={onUpload} />
        <RandomDataGenerator onDataGeneration={onDataGeneration} />
        <DateInput
          handleChange={handleChange}
          value={analyticsDate?.toJSDate() ?? null}
        />
      </div>
      {!!timeseriesCollection && (
        <GraphSelector
          timeseriesCollection={timeseriesCollection}
          selectedTimeseries={selectedTimeseries}
          setSelectedTimeseries={setSelectedTimeseries}
        />
      )}
      {!!timeseriesCollection && !!timeseriesCollection[selectedTimeseries] && (
        <TimeseriesGraph
          timeseries={timeseriesCollection[selectedTimeseries]}
        />
      )}
      {!!timeseriesCollection &&
        !!timeseriesCollection[selectedTimeseries] &&
        !!analyticsDate && (
          <Analytics
            timeseries={timeseriesCollection[selectedTimeseries]}
            analyticsDate={analyticsDate}
          />
        )}
    </div>
  );
}
