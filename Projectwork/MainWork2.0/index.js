const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const quoteArea = document.querySelector(".quote");
const authorArea = document.querySelector(".name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const printBtn = document.querySelector(".printScrn");
const anotherBtn = document.querySelector(".banother");
const loader = document.getElementById("preloader");

const endpoint = "https://api.quotable.io/random";

// Function to fetch quotes from the API
async function getQuotesFromApi(query) {
  try {
    const response = await fetch(`${endpoint}?tags=${query}`);
    if (response.ok) {
      const json = await response.json();
      return json.results;
    } else {
      console.log(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// Function to display quotes on the page
function displayQuotes(quotes) {
  searchResults.innerHTML = "";
  quotes.forEach((quote) => {
    const quoteDiv = document.createElement("div");
    quoteDiv.innerHTML = `<p class="quote"><i class="fas fa-quote-left"></i>${quote.content}<i class="fas fa-quote-right"></i></p><p class="author">${quote.author}</p>`;
    searchResults.appendChild(quoteDiv);
  });
}

// Function to get a random quote from the API
async function getRandomQuote() {
  loader.style.display = "block";
  const quoteResponse = await fetch(endpoint);
  const quoteData = await quoteResponse.json();
  quoteArea.innerHTML = quoteData.content;
  authorArea.innerHTML = quoteData.author;
  loader.style.display = "none";
}

// Function to speak the quote
function speakQuote() {
  const quoteText = quoteArea.textContent;
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(quoteText);
  synth.speak(utterance);
}

// Event listener for search button click
searchBtn.addEventListener("click", async () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    searchBtn.innerText = "Searching...";
    const quotes = await getQuotesFromApi(searchTerm);
    displayQuotes(quotes);
    searchBtn.innerText = "Search";
  }
});

// Event listener for another button click
anotherBtn.addEventListener("click", () => {
  getRandomQuote();
});

// Event listener for sound button click
soundBtn.addEventListener("click", () => {
  speakQuote();
});

// Event listener for copy button click
copyBtn.addEventListener("click", () => {
  const quoteText = quoteArea.textContent;
  navigator.clipboard.writeText(quoteText);
  alert("Quote copied to clipboard!");
});

// Event listener for twitter button click
twitterBtn.addEventListener("click", () => {
  const tweetText = `${quoteArea.textContent} - ${authorArea.textContent}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(tweetUrl);
});

// Event listener for print button click
printBtn.addEventListener("click", () => {
  html2canvas(document.querySelector(".content")).then(function (canvas) {
    document.body.appendChild(canvas);
    window.print();
  });
});

// Initial random quote on page load
getRandomQuote();
