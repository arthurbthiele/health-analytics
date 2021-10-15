import React, { ReactElement, useState } from "react";
import { FileUploader } from "./FileUploader";
import { HeartRateDatum, processData } from "../utilities/processData";
import { HeartRateGraph } from "./HeartRateGraph";
import { UploadData } from "../utilities/validateUpload";
import { DateInput } from "./DateInput";
// import moment from "moment";

export function DataContainer(): ReactElement {
  const [heartRateData, setHeartRateData] = useState<HeartRateDatum[]>([]);
  // const [lifestyleChangeDate, setLifestyleChangeDate] = useState<
  //   moment.Moment | undefined
  // >(undefined);

  function onUpload(input: UploadData): void {
    setHeartRateData(processData(input));
  }

  return (
    <div>
      <FileUploader onUpload={onUpload} />
      <DateInput />
      <HeartRateGraph heartRateData={heartRateData} />
    </div>
  );
}
