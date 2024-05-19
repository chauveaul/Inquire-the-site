"use strict";

const cheerio = require("cheerio");

async function htmlTextContents(link) {
  try {
    const response = await fetch(link);
    const html = await response.text();

    const $ = cheerio.load(html);
    let siteContents = "";
    $("body")
      .find("p")
      .each(function (i, el) {
        siteContents += $(el).text();
      });
    $("body")
      .find("h1")
      .each(function (i, el) {
        siteContents += $(el).text();
      });
    $("body")
      .find("h2")
      .each(function (i, el) {
        siteContents += $(el).text();
      });
    $("body")
      .find("h3")
      .each(function (i, el) {
        siteContents += $(el).text();
      });
    $("body")
      .find("li")
      .each(function (i, el) {
        siteContents += $(el).text();
      });
    return siteContents;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  htmlTextContents,
};
