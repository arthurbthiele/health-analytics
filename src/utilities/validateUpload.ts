/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function validate(inputJson: Record<string, any>): inputJson is UploadData {
  if (!inputJson.HealthData) return false;
  if (!inputJson.HealthData.Record) return false;
  for (const element of inputJson.HealthData.Record) {
    if (!element.attr) return false;
    if (!element.attr.type) return false;
  }
  return true;
}

interface UploadData {
  HealthData: {
    Record: Element[];
  };
}

interface Element {
  attr: Attribute;
}

interface Attribute {
  type: string;
  value?: string;
  startDate?: string;
}

export { validate };
export type { UploadData, Element, Attribute };
