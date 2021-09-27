const puppeteer = require("puppeteer");
const fs = require("fs");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here
    var description = document.querySelector('#detail-description-container #description').textContent;
    var title = document.querySelector('#detail-description-container h2').textContent;
    var price = document.querySelector('#detail-description-container .price').textContent;
    var address = document.querySelector('#detail-description-container .address').textContent;

    return {
      description,
      title,
      price,
      address,
    };
  });

  var json_out = JSON.stringify(items, undefined, 2);
  fs.writeFile('output.json', json_out, (err) => {
    if (err) {
      throw err;
    }
  });
  browser.close()

  return items;
};

main().then((data) => {
  console.log(data);
  process.exit();
});
