
// API FUnction for random quotes of different types
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": '5d84667e41msh639ed0b949ac42fp1c6268jsncd23ed68c7ed',
        "x-rapidapi-host": "quotes15.p.rapidapi.com"
      }
    })
    .then(res => res.json())
    .then(result => {
      quoteText.innerText = result.content;
      authorName.innerText = result.originator.name;
      quoteBtn.innerText = "Another One";
      quoteBtn.classList.remove("loading");
    })
    .catch(err => console.error(err));
  }
  