const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index';

const methods = {};
//scrape website
rp(url)
.then(function(html){
  //console.log(html)
  $('#wikiArticle',html).find('li').each(function(i,elm){
    //set method name as key, url as values
    methods[$(elm).find('a').text()] = 'https://developer.mozilla.org'+$(elm).find('a').attr().href;
  })
  //console.log(methods)
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
