import moment from "moment";
import { UploadData, Element } from "./validateUpload";

export interface HeartRateDatum {
  t: moment.Moment;
  y: number;
}

export function processData(inputJson: UploadData): HeartRateDatum[] {
  const heartRateRaw = inputJson.HealthData.Record.filter(
    (element: Element): element is RawHeartRateDatum =>
      element.attr.type === "HKQuantityTypeIdentifierRestingHeartRate" &&
      element.attr.value !== undefined &&
      element.attr.startDate !== undefined
  );

  const heartRates: HeartRateDatum[] = [];
  heartRateRaw.forEach((element) =>
    heartRates.push(getHeartRateDataPoint(element))
  );
  return heartRates;
}

interface RawHeartRateDatum {
  attr: HeartRateAttribute;
}

interface HeartRateAttribute {
  type: string;
  value: string;
  startDate: string;
}

function getHeartRateDataPoint(element: RawHeartRateDatum): HeartRateDatum {
  const startTime = moment(element.attr.startDate);
  // console.log(element.attr.startDate); // todo: figure out what's going on with moment
  const heartRate = parseInt(element.attr.value);
  const heartRateDatum = { t: startTime, y: heartRate };
  return heartRateDatum;
}
