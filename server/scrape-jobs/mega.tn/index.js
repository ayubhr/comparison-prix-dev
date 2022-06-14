const puppeteer = require('puppeteer');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');

let pageUrls;
const apiUrl = 'http://localhost:5000/api';

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false }); // default is true
  let page = await browser.newPage();

  // if urls.txt exists, read it and store it in pageUrls
  const filePath = __dirname + '/data/urls.txt';
  if (fs.existsSync(filePath)) {
    pageUrls = fs.readFileSync(filePath, 'utf8').split('\n');
  } else {
    await page.goto('https://www.mega.tn');
    pageUrls = await page.evaluate(() => {
      const urlArray = Array.from(document.links).map((link) => {
        // return only if link is a valid url format
        if (link.href.match(/^https?:\/\//) && !link.href.match(/.php/)) {
          return link.href;
        }
      });
      const uniqueUrlArray = [...new Set(urlArray)];
      return uniqueUrlArray;
    });

    // create a new file named 'urls.txt'
    // get absolute path of the file
    
    // write the urls to the file
    fs.writeFileSync(filePath, pageUrls.join('\n'));
  }

  for (let index = 0; index < pageUrls.length; index++) {
    // console.log(index);
    if (pageUrls[index] && pageUrls[index].match(/^https?:\/\//) && !pageUrls[index].match(/.php/)) {
      page = await browser.newPage();
      // go to each url and check if class products-list exists
      await page.goto(pageUrls[index]);
      // await page.waitForNavigation({ waitUntil: 'networkidle2' });
      await autoScroll(page);

      const products = await page.evaluate(() => {
        return !!document.querySelector('.products-list') // !! converts anything to boolean
      })
      if (products) { // you had the condition reversed. Not sure if it was intended.
         // await page.waitForSelector('.products-list');
         const elements = await page.$('.products-list');
         // get links from the page and store them in an array
         const links = await page.evaluate(() => {
             const linksArray = Array.from(document.querySelectorAll('.products-list a')).map((link) => {
                 return link.href;
             });
             return linksArray;
         });

         // remove duplicates from the array
         const uniqueLinks = [...new Set(links)];

         const fileLinksPath = __dirname + `/data/products-list-links-${index}.txt`;
         // write the links to the file
         fs.writeFileSync(fileLinksPath, uniqueLinks.join('\n'));

         // split the links into chunks of 6
         const chunkedLinks = links.reduce((acc, link, index) => {
             if (index % 2 === 0) {
                 // remove the duplicates
                 acc.push([link]);
             } else {
                 acc[acc.length - 1].push(link);
             }
             return acc;
         }, []);

         // write the chunks to the file json
         const fileLinksChunksPath = __dirname + `/data/products-list-links-chunks-${index}.json`;
         fs.writeFileSync(fileLinksChunksPath, JSON.stringify(chunkedLinks));

         // get img src from the page and store them in an array
         const images = await page.evaluate(() => {
             const imagesArray = Array.from(document.querySelectorAll('.products-list img')).map((img) => {
                 return img.src;
             });
             return imagesArray;
         });

         const fileImagesPath = __dirname + `/data/products-list-images-${index}.txt`;
         // write the images to the file
         fs.writeFileSync(fileImagesPath, images.join('\n'));

         // filter out the images that include 'icon-cart.png'
         const filteredImages = images.filter((image) => {
             return !image.match(/icon-cart.png/);
         });
         // split the images array by 3 items
         // const imagesArray = images.slice(0, images.length - 1);
         const imagesArraySplit = filteredImages.reduce((acc, val, i) => {
             if (i % 2 === 0) {
                 acc.push([]);
             }
             acc[acc.length - 1].push(val);
             return acc;
         }, []);

         const fileImagesArrayPath = __dirname + `/data/products-list-images-chunks-${index}.json`;
         // write the images to the file json
         fs.writeFileSync(fileImagesArrayPath, JSON.stringify(imagesArraySplit));

         const value = await page.evaluate(el => el.textContent, elements);

         // create a new file named 'products-list.txt'
         // get absolute path of the file
         const filePath = __dirname + `/data/products-list-${index}.txt`;

         // text to array of strings
         const array = value.split('\n');
         // trim each string
         const arrayTrimmed = array.map(string => string.trim());
         // remove empty strings
         const arrayFiltered = arrayTrimmed.filter(string => string !== '' && string !== 'à partir de:' && !string.includes('Voir plus') && !string.includes('de prix Disponible'));
         // write the data to the file
         fs.writeFileSync(filePath, arrayFiltered.join('\n'));
         // write the urls to the file

         // split the array by 9 items
         const arraySplit = arrayFiltered.reduce((acc, cur, i) => {
             if (i % 6 === 0) {
                 acc.push([]);
             }
             acc[acc.length - 1].push(cur);
             return acc;
         }, []);

         const filePathSplit = __dirname + `/data/products-list-chunks-${index}.json`;
         // write the data to the file json
         fs.writeFileSync(filePathSplit, JSON.stringify(arraySplit));

         // transform the array into an object
         await transform(filePathSplit, fileImagesArrayPath, fileLinksChunksPath);
      }
    }
  }

  await browser.close();
};

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 70;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}

const transform = async (productsJsonPath, imagesJsonPath, linksJsonPath) => {
  return new Promise((resolve, reject) => {
      const productsJson = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
      const imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
      const linksJson = JSON.parse(fs.readFileSync(linksJsonPath, 'utf8'));

      const products = [];
      for (let index = 0; index < productsJson.length; index++) {
          const product = {
              name: productsJson[index][0],
              reference: productsJson[index][1],
              price: productsJson[index][5],
              description: productsJson[index][2],
              image: imagesJson[index][0],
              brandImage: imagesJson[index][1],
              link: linksJson[index][0],
              brandLink: linksJson[index][1],
              brand: productsJson[index][3].split(':')[1],
          };

          postProductsToApi(product);
          products.push(product);
      }

      const json = JSON.stringify(products);
      // append the array to the file
      fs.appendFileSync(__dirname + '/data/products.json', json);
      resolve();
  });
}


const postProductsToApi = async (product) => {
  const response = await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  console.log(data);
}

// create cron job to run the script every 1 minutes

scraperJob = new CronJob(
	'*/1 * * * *',
	function () {
		scraper();
    // log time of scrape
    console.log(`Scrape at ${new Date()}`);
	},
	null,
	true,
	'America/Los_Angeles'
);

// Use this if the 4th param is default value(false)
scraperJob.start();

postProducts = new CronJob(
	'*/2 * * * *',
	function () {
		// Post products to the api endpoint
    postProductsToApi();
    // Log time of post
    console.log(`Post at ${new Date()}`);
	},
	null,
	true,
	'America/Los_Angeles'
);

// Use this if the 4th param is default value(false)
postProducts.start();