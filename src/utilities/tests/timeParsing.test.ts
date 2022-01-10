import { DateTime } from "luxon";
import { getISODateFormat } from "../processData";

describe("when luxon is passed a date", () => {
  it(`it should parse it as a luxon datetime and output nicely`, () => {
    const appleDateInput = "2021-03-20 20:12:15 +1000";
    const isoDate = getISODateFormat(appleDateInput);
    expect(isoDate).toEqual("2021-03-20T20:12:15+1000");

    const luxonDate = DateTime.fromISO(isoDate);

    // todo: why does the timezone change??
    expect(luxonDate.toISO()).toEqual("2021-03-20T21:12:15.000+11:00");
    const dayLater = luxonDate.plus({ days: 1 });
    console.log(luxonDate > dayLater);
  });

  it("temp", () => {
    const obj = { a: 1, b: 2, c: 3 } as const;
    for (const key in obj) {
      console.log(key, obj[key]);
      obj[key] = obj[key] + 1;
    }
    console.log(obj);
  });
});
