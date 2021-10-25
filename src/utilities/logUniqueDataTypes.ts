import { UploadData } from "./validateUpload";

export function logUniqueDataTypes(inputJson: UploadData): void {
  const recordTypes = new Set();
  inputJson.HealthData.Record.forEach((element) => {
    if (
      element.attr.value !== undefined &&
      element.attr.startDate !== undefined
    ) {
      recordTypes.add(element.attr.type);
    }
  });
  console.log([Array.from(recordTypes)]);
}
