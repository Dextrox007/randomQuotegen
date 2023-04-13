const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector(".banother"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  searchInput = document.querySelector('input[type="text"]'),
  searchBtn = document.querySelector(".bsearch"),
  printBtn = document.querySelector(".printScrn"),
  searchResults = document.querySelector(".quote-area");

window.onload = function () {
  document.querySelector("#preloader").classList.add("hide-preloader");
};

searchBtn.addEventListener('click', searchQuote);

let searchResultsArr = [];
function searchQuote() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length < 1) {
    // quoteText.innerText = localStorage.getItem("lastShownQuote").content;
    // authorName.innerText = localStorage.getItem("lastShownQuote").author;
    return;
  }
  searchBtn.classList.add("searching");
  searchBtn.innerText = "searching...";
  // fetch(`https://api.quotable.io/quotes?contains=${searchTerm}`)
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "YOUR_API_KEY",
      "x-rapidapi-host": "quotes15.p.rapidapi.com"
    }
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.length === 0) {
        searchResults.innerHTML = "<p>No results found</p>";
      } else {
        searchResultsArr = result; 
        searchResults.innerHTML = "";
        result.forEach((quote) => {
          const quoteDiv = document.createElement("div");
          quoteDiv.innerHTML = `<p class="quote">${quote.content}</p><p class="author">${quote.author}</p>`;
          searchResults.appendChild(quoteDiv);
        });
      }
      searchBtn.innerText = "Search";
      searchBtn.classList.remove("loading");
    });
}
function clearSearch() {
  searchInput.value = "";
  searchResults.innerHTML = ""; // clear the results area
  searchResultsArr.forEach((quote) => {
    const quoteDiv = document.createElement("div");
    quoteDiv.innerHTML = `<p class="quote">${quote.content}</p><p class="author">${quote.author}</p>`;
    searchResults.appendChild(quoteDiv); // add each quote to the results area
  });
}



function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "Another One";
      quoteBtn.classList.remove("loading");
    })
    .finally(() => {
      if (localStorage.getItem("lastShownQuote")) {
        let lastQuote = JSON.parse(localStorage.getItem("lastShownQuote"));
        quoteText.innerText = lastQuote.content;
        authorName.innerText = lastQuote.author;
      }
    });
}

soundBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  } else {
    const utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    // utterance.pitch = 1.5; // Change the pitch to make the voice sound lower
    // utterance.rate = 1.5; // Change the rate to make the voice speak slower
    speechSynthesis.speak(utterance);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

printBtn.addEventListener("click", () => {
  window.print();
});

quoteBtn.addEventListener("click", randomQuote);
