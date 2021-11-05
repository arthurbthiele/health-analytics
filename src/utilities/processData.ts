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
        type: dataType,
        unit: unit,
        dataSet: [timeSeriesDatum],
      };
    } else {
      newTimeSeriesCollection[dataType].dataSet.push(timeSeriesDatum);
    }
  });
  return newTimeSeriesCollection;
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
