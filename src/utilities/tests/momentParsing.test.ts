import moment from "moment";
const inputDate1 = "2021-10-02 08:21:48 +1000";
const duplicateArray = [1, 1, 2, 1, 3, 4, 4, 4, 2, 1];

describe("when moment is passed a date", () => {
  it(`it should parse it as a moment and output nicely`, () => {
    const momentDate = moment(inputDate1);
    const unDuplicatedArray = duplicateArray.filter(
      (v, i, s) => s.indexOf(v) === i
    );
    expect(unDuplicatedArray).toEqual(1);
  });
});
