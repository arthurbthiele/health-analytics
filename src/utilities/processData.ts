import { DateTime } from "luxon";
import { Element, UploadData } from "./validateUpload";
import { collateTimeseriesCollectionByDay } from "./collateTimeseriesCollectionByDay";

export interface TimeseriesDatum {
  x: DateTime;
  y: number;
}

export interface Timeseries {
  type: string;
  unit: string;
  dataSet: TimeseriesDatum[];
}

export function processData(inputJson: UploadData): Record<string, Timeseries> {
  const timeseriesCollection: Record<string, Timeseries> = {};

  const timeseriesRaw = inputJson.HealthData.Record.filter(
    (element: Element): element is RawTimeseriesDatum =>
      element.attr.value !== undefined &&
      element.attr.startDate !== undefined &&
      element.attr.type !== undefined &&
      element.attr.unit !== undefined
  );

  timeseriesRaw.forEach((element) => {
    const timeseriesDatum = getTimeseriesDataPoint(element);
    const dataType = trimDataType(element.attr.type);
    const unit = element.attr.unit;

    if (!(dataType in timeseriesCollection)) {
      timeseriesCollection[dataType] = {
        type: dataType,
        unit: unit,
        dataSet: [timeseriesDatum],
      };
    } else {
      timeseriesCollection[dataType].dataSet.push(timeseriesDatum);
    }
  });
  return collateTimeseriesCollectionByDay(
    sortTimeseriesCollection(timeseriesCollection)
  );
}

interface RawTimeseriesDatum {
  attr: TimeseriesAttribute;
}

interface TimeseriesAttribute {
  type: string;
  value: string;
  startDate: string;
  unit: string;
}

function getTimeseriesDataPoint(element: RawTimeseriesDatum): TimeseriesDatum {
  const startTime = DateTime.fromISO(getISODateFormat(element.attr.startDate));
  const value = Number(element.attr.value);
  return { x: startTime, y: value };
}

// Input format is 2021-03-20 20:12:15 +1000
// ISO input format is 2021-03-20T20:12:15+1000
// We replace the first space with a T, and the second gets trimmed

export function getISODateFormat(appleInput: string): string {
  const chunks = appleInput.split(" ");

  return chunks[0] + "T" + chunks[1] + chunks[2];
}

function sortTimeseriesCollection(
  input: Record<string, Timeseries>
): Record<string, Timeseries> {
  for (const value of Object.values(input)) {
    value.dataSet.sort(
      (a: TimeseriesDatum, b: TimeseriesDatum) => a.x.diff(b.x).milliseconds
    );
  }
  return input;
}

function trimDataType(input: string): string {
  input = input.replace("HKQuantityTypeIdentifier", "");
  input = input.replace("HKDataType", "");
  input = input.replace(/([a-z])([A-Z])/g, "$1 $2");
  return input;
}
