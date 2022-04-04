import { Timeseries } from "../processData";

export function getMaxChangeIndex(timeseries: Timeseries): number | undefined {
  let sum = 0;
  if (timeseries.dataSet.length < 40) {
    return undefined;
  }
  timeseries.dataSet.forEach((element) => {
    sum = sum + element.y;
  });

  const differenceInAverages: number[] = [];
  let runningSum = 0;
  timeseries.dataSet.forEach((value, index) => {
    runningSum += value.y;
    const averageBefore = runningSum / (index + 1);
    const averageAfter =
      (sum - runningSum) / (timeseries.dataSet.length - index - 1);
    differenceInAverages.push(Math.abs(averageAfter - averageBefore));
  });
  const edgeOffset = 20;
  let max = 0;
  let maxIndex = 0;
  differenceInAverages
    .slice(edgeOffset, differenceInAverages.length - edgeOffset)
    .forEach((value, index) => {
      if (value > max) {
        maxIndex = index;
        max = value;
      }
    });
  return maxIndex + edgeOffset;
}
