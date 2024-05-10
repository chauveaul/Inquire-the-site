"use strict";

//Add checks to avoid navigating to files to improve performance
//I believe this will be done by adding the checks in grabUrls before adding to the set

const cheerio = require("cheerio");

async function findURL(baseUrl, currUrl, keyword, visistedUrls = new Set()) {
  let link = "";
  if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, baseUrl.length - 1);
  if (currUrl.endsWith("/")) currUrl = currUrl.slice(0, currUrl.length - 1);
  if (visistedUrls.has(currUrl)) return link;
  visistedUrls.add(currUrl);

  try {
    const response = await fetch(currUrl);
    if (response.status >= 400) {
      return link;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      return link;
    }

    const html = await response.text();

    const $ = cheerio.load(html);
    const title = $("head").find("title").text();
    if (title.toLowerCase().includes(keyword)) {
      link = currUrl;
      return link;
    }

    const scrapedUrls = grabUrls(baseUrl, html);
    for (const url of scrapedUrls) {
      if (!visistedUrls.has(url))
        link = await findURL(baseUrl, url, keyword, visistedUrls);
      if (link !== "") return link;
    }
  } catch (error) {
    console.log(error);
  }
  return link;
}

function grabUrls(baseUrl, html) {
  const urls = new Set();
  const $ = cheerio.load(html);
  $("body")
    .find("a")
    .each((i, el) => {
      let url = $(el).attr("href");
      if (!url) return;
      url = url.toLowerCase();

      if (url.startsWith("www.")) url = `https://${url}`;

      if (url.startsWith("mailto:") || url.startsWith("tel:")) return;
      try {
        const { hostname: currUrlHostname } = new URL(url);
        const { hostname: baseUrlHostname } = new URL(baseUrl);

        if (
          !currUrlHostname.includes(baseUrlHostname) ||
          !baseUrlHostname.includes(currUrlHostname)
        ) {
          return;
        }
      } catch (error) {
        return;
      }

      if (url.startsWith("#")) {
        return;
      }
      urls.add(url);
    });
  return urls;
}

module.exports = {
  findURL,
  grabUrls,
};
