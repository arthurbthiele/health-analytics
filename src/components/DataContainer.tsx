import React, { ReactElement, useState } from "react";
import { FileUploader } from "./FileUploader";
import { processData, NewTimeSeriesCollection } from "../utilities/processData";
import { TimeSeriesGraph } from "./TimeSeriesGraph";
import { UploadData } from "../utilities/validateUpload";
import { DateInput } from "./DateInput";
// import moment from "moment";

export function DataContainer(): ReactElement {
  const [timeSeriesCollection, setTimeSeriesCollection] =
    useState<NewTimeSeriesCollection>();
  // const [lifestyleChangeDate, setLifestyleChangeDate] = useState<
  //   moment.Moment | undefined
  // >(undefined);

  function onUpload(input: UploadData): void {
    setTimeSeriesCollection(processData(input));
  }

  return (
    <div>
      <FileUploader onUpload={onUpload} />
      <DateInput />
      {timeSeriesCollection
        ? Object.values(timeSeriesCollection.timeSeries).map(
            (timeSeries, index) => (
              <TimeSeriesGraph timeSeries={timeSeries} key={index} />
            )
          )
        : null}
    </div>
  );
}
