import { indexBy, prop } from "./utils";

describe("indexBy", () => {
  it("should registry from elements from array", () => {
    expect(indexBy([1, 2, 3], String)).toEqual({
      1: 1,
      2: 2,
      3: 3,
    });

    expect(
      indexBy(
        [
          [1, 2, 3],
          [4, 5],
          [6, 7, 8, 9],
        ],
        (item) => item.length
      )
    ).toEqual({
      3: [1, 2, 3],
      2: [4, 5],
      4: [6, 7, 8, 9],
    });
  });
});

describe("prop", () => {
  it("should return value of property", () => {
    expect(prop("foo")({ foo: 123 })).toEqual(123);
  });
});
