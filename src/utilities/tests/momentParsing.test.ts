import { DateTime } from "luxon";
describe("when luxon is passed a date", () => {
  it(`it should parse it as a luxon datetime and output nicely`, () => {
    const luxonDate = DateTime.now();
    // only works today haha
    expect(luxonDate.toISODate()).toEqual("2021-11-05");
  });
});
