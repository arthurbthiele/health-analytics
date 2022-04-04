import React, { ReactElement, useState } from "react";
import { FileUploader } from "./FileUploader";
import { processData, Timeseries } from "../utilities/processData";
import { UploadData } from "../utilities/validateUpload";
import { GraphSelector } from "./GraphSelector";
import { RandomDataGenerator } from "./RandomDataGenerator";
import { Analytics } from "./Analytics";
import { TimeseriesGraph } from "./TimeseriesGraph";
import { DateTime } from "luxon";
import { SplitAnalytics } from "../utilities/analytics/getSplitTimeseriesAnalytics";

export function DataContainer(): ReactElement {
  const [timeseriesCollection, setTimeseriesCollection] =
    useState<Record<string, Timeseries>>();
  const [selectedTimeseries, setSelectedTimeseries] = useState<string>("");
  const [analyticsDate, setAnalyticsDate] = React.useState<DateTime | null>(
    DateTime.now()
  );
  const [analytics, setAnalytics] = useState<SplitAnalytics>();

  function onUpload(input: UploadData): void {
    setTimeseriesCollection(processData(input));
  }
  function onDataGeneration(input: Record<string, Timeseries>): void {
    setTimeseriesCollection(input);
  }

  return (
    <div
      style={{
        padding: 24,
        width: "60%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      {" "}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FileUploader onUpload={onUpload} />
        <RandomDataGenerator onDataGeneration={onDataGeneration} />
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
          analyticsDate={analyticsDate}
          analytics={analytics}
        />
      )}
      {!!timeseriesCollection &&
        !!timeseriesCollection[selectedTimeseries] &&
        !!analyticsDate && (
          <Analytics
            timeseries={timeseriesCollection[selectedTimeseries]}
            setAnalyticsDate={setAnalyticsDate}
            analytics={analytics}
            setAnalytics={setAnalytics}
          />
        )}
    </div>
  );
}
