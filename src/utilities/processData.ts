import moment from "moment";
import { UploadData, Element } from "./validateUpload";
// import { logUniqueDataTypes } from "./logUniqueDataTypes";

export interface TimeSeriesDatum {
  t: moment.Moment;
  y: number;
}

export interface TimeSeries {
  type: string;
  dataSet: TimeSeriesDatum[];
}

export interface TimeSeriesCollection {
  HKQuantityTypeIdentifierHeight: TimeSeries;
  HKQuantityTypeIdentifierBodyMass: TimeSeries;
  HKQuantityTypeIdentifierHeartRate: TimeSeries;
  HKQuantityTypeIdentifierStepCount: TimeSeries;
  HKQuantityTypeIdentifierDistanceWalkingRunning: TimeSeries;
  HKQuantityTypeIdentifierBasalEnergyBurned: TimeSeries;
  HKQuantityTypeIdentifierActiveEnergyBurned: TimeSeries;
  HKQuantityTypeIdentifierFlightsClimbed: TimeSeries;
  HKQuantityTypeIdentifierAppleExerciseTime: TimeSeries;
  HKQuantityTypeIdentifierRestingHeartRate: TimeSeries;
  HKQuantityTypeIdentifierVO2Max: TimeSeries;
  HKQuantityTypeIdentifierWalkingHeartRateAverage: TimeSeries;
  HKQuantityTypeIdentifierEnvironmentalAudioExposure: TimeSeries;
  HKQuantityTypeIdentifierHeadphoneAudioExposure: TimeSeries;
  HKQuantityTypeIdentifierWalkingDoubleSupportPercentage: TimeSeries;
  HKQuantityTypeIdentifierSixMinuteWalkTestDistance: TimeSeries;
  HKQuantityTypeIdentifierAppleStandTime: TimeSeries;
  HKQuantityTypeIdentifierWalkingSpeed: TimeSeries;
  HKQuantityTypeIdentifierWalkingStepLength: TimeSeries;
  HKQuantityTypeIdentifierWalkingAsymmetryPercentage: TimeSeries;
  HKQuantityTypeIdentifierStairAscentSpeed: TimeSeries;
  HKQuantityTypeIdentifierStairDescentSpeed: TimeSeries;
  HKDataTypeSleepDurationGoal: TimeSeries;
  HKCategoryTypeIdentifierSleepAnalysis: TimeSeries;
  HKCategoryTypeIdentifierAppleStandHour: TimeSeries;
  HKQuantityTypeIdentifierHeartRateVariabilitySDNN: TimeSeries;
}

export function processData(inputJson: UploadData): TimeSeriesCollection {
  // uncomment to log list of unique data types that can be expressed as timeseries:
  // logUniqueDataTypes(inputJson);
  const timeSeriesCollection = createTimeSeriesCollection();

  const timeSeriesRaw = inputJson.HealthData.Record.filter(
    (element: Element): element is RawTimeSeriesDatum =>
      element.attr.value !== undefined && element.attr.startDate !== undefined
    // todo: guarantee dataType matches restrictions
  );

  // const timeSeriesData: TimeSeriesDatum[] = [];
  timeSeriesRaw.forEach((element) => {
    const timeSeriesDatum = getTimeSeriesDataPoint(element);
    const dataType = element.attr.type;
    timeSeriesCollection[dataType].dataSet.push(timeSeriesDatum);
  });
  return timeSeriesCollection;
}

interface RawTimeSeriesDatum {
  attr: TimeSeriesAttribute;
}

interface TimeSeriesAttribute {
  type: keyof TimeSeriesCollection;
  value: string;
  startDate: string;
}

function getTimeSeriesDataPoint(element: RawTimeSeriesDatum): TimeSeriesDatum {
  const startTime = moment(element.attr.startDate);
  const value = parseInt(element.attr.value);
  const timeSeriesDatum = { t: startTime, y: value };
  return timeSeriesDatum;
}

function createTimeSeriesCollection(): TimeSeriesCollection {
  const validTimeSeriesTypes: (keyof TimeSeriesCollection)[] = [
    "HKQuantityTypeIdentifierHeight",
    "HKQuantityTypeIdentifierBodyMass",
    "HKQuantityTypeIdentifierHeartRate",
    "HKQuantityTypeIdentifierStepCount",
    "HKQuantityTypeIdentifierDistanceWalkingRunning",
    "HKQuantityTypeIdentifierBasalEnergyBurned",
    "HKQuantityTypeIdentifierActiveEnergyBurned",
    "HKQuantityTypeIdentifierFlightsClimbed",
    "HKQuantityTypeIdentifierAppleExerciseTime",
    "HKQuantityTypeIdentifierRestingHeartRate",
    "HKQuantityTypeIdentifierVO2Max",
    "HKQuantityTypeIdentifierWalkingHeartRateAverage",
    "HKQuantityTypeIdentifierEnvironmentalAudioExposure",
    "HKQuantityTypeIdentifierHeadphoneAudioExposure",
    "HKQuantityTypeIdentifierWalkingDoubleSupportPercentage",
    "HKQuantityTypeIdentifierSixMinuteWalkTestDistance",
    "HKQuantityTypeIdentifierAppleStandTime",
    "HKQuantityTypeIdentifierWalkingSpeed",
    "HKQuantityTypeIdentifierWalkingStepLength",
    "HKQuantityTypeIdentifierWalkingAsymmetryPercentage",
    "HKQuantityTypeIdentifierStairAscentSpeed",
    "HKQuantityTypeIdentifierStairDescentSpeed",
    "HKDataTypeSleepDurationGoal",
    "HKCategoryTypeIdentifierSleepAnalysis",
    "HKCategoryTypeIdentifierAppleStandHour",
    "HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
  ];
  const timeSeriesCollection = {} as TimeSeriesCollection;
  validTimeSeriesTypes.forEach((validTimeSeriesType) => {
    const timeSeries: TimeSeries = { type: validTimeSeriesType, dataSet: [] };
    timeSeriesCollection[validTimeSeriesType] = timeSeries;
  });
  return timeSeriesCollection;
}
