const sortPages = (pages) => {
  return Object.entries(pages).sort((a, b) => b[1] - a[1]);
};

const printReport = (pages) => {
  console.log("\n\n====================");
  console.log("==== [ REPORT ] ====");
  console.log("====================");

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    const [url, hits] = page;
    console.log(`Found ${hits} internal links to page: ${url}`);
  }
};

module.exports = { sortPages, printReport };
