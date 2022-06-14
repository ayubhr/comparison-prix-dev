const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const pretty = require("pretty");


class Product {
  constructor(image, title, price, market, link) {
    this.image = image;
    this.title = title;
    this.price = price;
    this.market = market;
    this.link = link;
  }
}

const productsDetail = async (param) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    param
  );
  await page.waitForTimeout(3000);
  // await page.waitForNavigation()
  const markup = await page.evaluate(() => {
    let elements = document.getElementById("single-product");
    return elements.innerHTML;
  });
  const markup_down = await page.evaluate(() => {
    let elements = document.getElementById("offerList");
    return elements.innerHTML;
  });
  const markup_tx = await page.evaluate(() => {
    let elements = document.getElementById("single-product-tab");
    return elements.innerHTML;
  });
  const $ = cheerio.load(String(markup));
  const Cher = cheerio.load(String(markup_down));
  const Trx = cheerio.load(String(markup_tx));
  //console.log(pretty($.html()));
  let title = $(".title > h1").text();
  let marque = $("#infoplusprodduit > li:first-child   > a").text();
  let refrence = $("#infoplusprodduit > li:nth-child(2)  > span").text();
  let category = $(
    "#infoplusprodduit > li:nth-child(3)  > a:nth-child(3)"
  ).text();
  let shortDesc = $("#infoproduct > span ").text();
  let cover = $(".slick-current > div > img").attr("src");
  let price = $(" .prices > .price-current").text();
  let urlMarket = $(" .prices > .price-msg > a")
    .attr("data-tip")
    .split(">")
    .pop();
  let imgMarket = $(" .prices > img").attr("src");
  let description = Trx("#description").text();

  
  const prices = [];
  Cher(".productOffers-list")
    .find("li")
    .each(function (i, elm) {
      let t1 = new Product(
        Cher(elm).find(".productOffers-listItemOfferLogoShop").attr("src"),
        Cher(elm).find(".productOffers-listItemTitleInner").attr("title"),
        Cher(elm).find("#offerprice > a").text(),
        Cher(elm).find(".productOffers-listItemOfferLogoShop").attr("src"),
        Cher(elm).find("a").attr("href")
      );
      prices.push(t1);
    });
  const result = {
    title: title,
    marque: marque,
    refrence: refrence,
    category: category,
    shortDesc: shortDesc,
    cover: cover,
    price: price,
    urlMarket: urlMarket,
    imgMarket: imgMarket,
    description: description,
    prices_table: prices,
  };
  console.log(result);
  await browser.close();
  return result;
};

module.exports = productsDetail ;