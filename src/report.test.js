const { sortPages } = require("./report.js");
const { expect, test } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://imkaranks.github.io/path": 1,
    "https://imkaranks.github.io": 3,
  };

  const actual = sortPages(input);

  const expected = [
    ["https://imkaranks.github.io", 3],
    ["https://imkaranks.github.io/path", 1],
  ];

  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://imkaranks.github.io/path": 1,
    "https://imkaranks.github.io": 3,
    "https://imkaranks.github.io/path2": 2,
    "https://imkaranks.github.io/path3": 7,
    "https://imkaranks.github.io/path4": 9,
  };

  const actual = sortPages(input);

  const expected = [
    ["https://imkaranks.github.io/path4", 9],
    ["https://imkaranks.github.io/path3", 7],
    ["https://imkaranks.github.io", 3],
    ["https://imkaranks.github.io/path2", 2],
    ["https://imkaranks.github.io/path", 1],
  ];

  expect(actual).toEqual(expected);
});
