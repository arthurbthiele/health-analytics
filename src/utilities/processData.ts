import moment from "moment";
import { DateTime } from "luxon";
import { Element, UploadData } from "./validateUpload";

export interface TimeSeriesDatum {
  t: moment.Moment;
  y: number;
}

export interface TimeSeries {
  type: string;
  unit: string;
  dataSet: TimeSeriesDatum[];
}

export function processData(inputJson: UploadData): Record<string, TimeSeries> {
  const startTime = moment();
  const newTimeSeriesCollection: Record<string, TimeSeries> = {};

  const timeSeriesRaw = inputJson.HealthData.Record.filter(
    (element: Element): element is RawTimeSeriesDatum =>
      element.attr.value !== undefined && element.attr.startDate !== undefined
  );
  console.log("Time to filter:");
  const filterTime = moment();
  const timeToFilter = filterTime.diff(startTime);
  console.log(timeToFilter);
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
  console.log("Time to allocate to timeseries:");
  const timeToAllocate = moment().diff(startTime);
  console.log(timeToAllocate);
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
  const startTime = moment(element.attr.startDate);
  const value = parseInt(element.attr.value);
  return { t: startTime, y: value };
}
