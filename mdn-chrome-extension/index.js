//import from cache object from JSON file
//add eventListener for highlight/double click
//check highlighted value is in cache
//if value is in cache,display pop up, find p, syntax, pre -> add to pop up asynchronously
  //add elements to pop up
const cache = require('./cache.json');
//console.log(cache['toString'])

function loadPopup(url){
  let test = undefined;
  const urlToSearch = url;
  fetch(urlToSearch)
    .then((response) => {
      return response.text();
    }).then((responseText) => {
      test = $("<div></div>").append($.parseHTML(responseText));
      // Get the description.
      const descriptionText = test.find("#wikiArticle").find("p").first().text();
      //set popup descriptionText to new text found
      const des = document.getElementById('mdnthis-bubble-description');
      des.innerHTML(descriptionText);
      /// Get the syntax.
      const syntaxText = test.find("#wikiArticle").find(".syntaxbox").text();
      const syn = document.getElementById('mdnthis-bubble-syntax');
      syn.innerHTML(syntaxText);
      // Get the example code.
      const exampleText = undefined;
      if (test.find("#wikiArticle").find("#Example").length !== 0) {
        exampleText = test.find("#wikiArticle").find("#Example").next("pre").text();
      } else {
      exampleText = test.find("#wikiArticle").find("#Examples").next("pre").text();
      }
      const ex = document.getElementById('mdnthis-bubble-example');
      ex.innerHTML(exampleText);
      //display popup
  });
}
