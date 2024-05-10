"use strict";

const cheerio = require("cheerio");

async function htmlTextContents(link) {
  try {
    const response = await fetch(link);
    const html = await response.text();

    const $ = cheerio.load(html);
    const textContents = $("body").text();
    return textContents;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  htmlTextContents,
};
