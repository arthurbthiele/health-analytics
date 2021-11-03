import moment from "moment";
import { Element, UploadData } from "./validateUpload";

export interface TimeSeriesDatum {
  t: moment.Moment;
  y: number;
}

export interface TimeSeries {
  type: string;
  dataSet: TimeSeriesDatum[];
}

export interface TimeSeriesCollection {
  timeSeries: Record<string, TimeSeries>;
}

export function processData(inputJson: UploadData): TimeSeriesCollection {
  const startTime = moment();
  const newTimeSeriesCollection: TimeSeriesCollection = { timeSeries: {} };

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

    if (!(dataType in newTimeSeriesCollection.timeSeries)) {
      newTimeSeriesCollection.timeSeries[dataType] = {
        type: dataType,
        dataSet: [timeSeriesDatum],
      };
    } else {
      newTimeSeriesCollection.timeSeries[dataType].dataSet.push(
        timeSeriesDatum
      );
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
}

function getTimeSeriesDataPoint(element: RawTimeSeriesDatum): TimeSeriesDatum {
  const startTime = moment(element.attr.startDate);
  const value = parseInt(element.attr.value);
  return { t: startTime, y: value };
}