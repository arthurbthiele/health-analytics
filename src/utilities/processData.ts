import { DateTime } from "luxon";
import { Element, UploadData } from "./validateUpload";

export interface TimeSeriesDatum {
  x: DateTime;
  y: number;
}

export interface TimeSeries {
  type: string;
  unit: string;
  dataSet: TimeSeriesDatum[];
}

export function processData(inputJson: UploadData): Record<string, TimeSeries> {
  const newTimeSeriesCollection: Record<string, TimeSeries> = {};

  const timeSeriesRaw = inputJson.HealthData.Record.filter(
    (element: Element): element is RawTimeSeriesDatum =>
      element.attr.value !== undefined &&
      element.attr.startDate !== undefined &&
      element.attr.type !== undefined &&
      element.attr.unit !== undefined
  );

  timeSeriesRaw.forEach((element) => {
    const timeSeriesDatum = getTimeSeriesDataPoint(element);
    const dataType = element.attr.type;
    const unit = element.attr.unit;

    if (!(dataType in newTimeSeriesCollection)) {
      newTimeSeriesCollection[dataType] = {
        type: trimDataType(dataType),
        unit: unit,
        dataSet: [timeSeriesDatum],
      };
    } else {
      newTimeSeriesCollection[dataType].dataSet.push(timeSeriesDatum);
    }
  });
  return sortTimeSeriesCollection(newTimeSeriesCollection);
}

interface RawTimeSeriesDatum {
  attr: TimeSeriesAttribute;
}

interface TimeSeriesAttribute {
  type: string;
  value: string;
  startDate: string;
  unit: string;
}

function getTimeSeriesDataPoint(element: RawTimeSeriesDatum): TimeSeriesDatum {
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

function sortTimeSeriesCollection(
  input: Record<string, TimeSeries>
): Record<string, TimeSeries> {
  for (const value of Object.values(input)) {
    value.dataSet.sort(
      (a: TimeSeriesDatum, b: TimeSeriesDatum) => b.x.diff(a.x).milliseconds
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
