const { JSDOM } = require("jsdom");

const normalizeURL = (urlString) => {
  const url = new URL(urlString);

  const fullPath = `${url.hostname}${url.pathname}`;

  return fullPath.length > 0 && fullPath.slice(-1) === "/"
    ? fullPath.slice(0, -1)
    : fullPath;
};

const getURLFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  return Array.from(linkElements).map(({ href }) => {
    if (href.slice(0, 1) === "/") {
      // relative
      try {
        const url = new URL(href.trim(""), baseURL);
        return url.href;
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
      }
    } else {
      // absolute
      try {
        const url = new URL(href.trim(""));
        return url.href;
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
      }
    }
  });
};

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    if (response.status > 399)
      throw new Error(
        `Got HTTP error, status code: ${resp.status} on page: ${currentURL}`
      );

    const contentType = response.headers.get("Content-Type");

    if (!contentType.includes("text/html"))
      throw new Error(
        `Got non-html response: ${contentType} on page: ${currentURL}`
      );

    const htmlBody = await response.text();

    const htmlBodyURLs = getURLFromHTML(htmlBody, currentURL);

    for (const htmlBodyURL of htmlBodyURLs) {
      pages = await crawlPage(baseURL, htmlBodyURL, pages);
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return pages;
  }

  return pages;
};

module.exports = {
  normalizeURL,
  getURLFromHTML,
  crawlPage,
};
