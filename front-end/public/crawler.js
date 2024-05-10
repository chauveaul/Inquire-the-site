"use strict";

//Add checks to avoid navigating to files to improve performance
//I believe this will be done by adding the checks in grabUrls before adding to the set

const cheerio = require("cheerio");

async function findURL(
  baseUrl,
  currUrl,
  keyword,
  visistedUrls = new Set(),
  startTime = Date.now() / 1000,
  currTime = Date.now() / 1000,
) {
  let link = "";
  if (!baseUrl.endsWith("/")) baseUrl += "/";
  if (!currUrl.endsWith("/")) currUrl += "/";
  if (visistedUrls.has(currUrl)) return link;
  visistedUrls.add(currUrl);

  console.log(`Time elapsed: ${currTime - startTime}`);
  console.log(`Currently visiting: ${currUrl}`);

  if (currTime - startTime >= 10) link = "DNE";

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
      if (!visistedUrls.has(url)) {
        console.log(`Visited urls: ${visistedUrls.size}`);
        link = await findURL(baseUrl, url, keyword, visistedUrls, startTime);
      }
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

      if (
        url.startsWith("#") ||
        url.slice(url.lastIndexOf("/")).includes(".")
      ) {
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
