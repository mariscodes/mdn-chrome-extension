const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index';

const methods = {};
// send request to url to receive HTML to scrape
rp(url)
.then(function(html){
  // using cheerio, scrape the html for the wikiArticle
  $('#wikiArticle',html).find('li').each(function(i,elm){
    //set method name as key, url as values in meths object
    methods[$(elm).find('a').text()] = 'https://developer.mozilla.org'+$(elm).find('a').attr().href;
  })
  // stringify the methods object
  let jsonString = JSON.stringify(methods);
  //write to JSON file
  fs.writeFile("cache.json", jsonString, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
  })
});
