const { normalizeURL, getURLFromHTML } = require("./crawl.js");
const { expect, test } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://imkaranks.github.io/path";
  const actual = normalizeURL(input);
  const expected = "imkaranks.github.io/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://imkaranks.github.io/path/";
  const actual = normalizeURL(input);
  const expected = "imkaranks.github.io/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL lettercases", () => {
  const input = "https://imkaranks.github.io/path/";
  const actual = normalizeURL(input);
  const expected = "imkaranks.github.io/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://imkaranks.github.io/path/";
  const actual = normalizeURL(input);
  const expected = "imkaranks.github.io/path";
  expect(actual).toEqual(expected);
});

test("getURLFromHTML absolute urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://imkaranks.github.io/path/">Boot Dev Blog</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://imkaranks.github.io";
  const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://imkaranks.github.io/path/"];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML relative urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">Boot Dev Blog</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://imkaranks.github.io";
  const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://imkaranks.github.io/path/"];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML multiple urls", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://imkaranks.github.io/whats-poppin/">What's poppin</a>
      <a href="/path/">Boot Dev Blog</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://imkaranks.github.io";
  const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://imkaranks.github.io/whats-poppin/",
    "https://imkaranks.github.io/path/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML invalid url", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">Invalid URL</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://imkaranks.github.io";
  const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
