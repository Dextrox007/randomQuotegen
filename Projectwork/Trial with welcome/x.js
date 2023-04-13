const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  printScrn = document.querySelector(".printScrn");
//   quoteArea = document.querySelector(".quote-area");

window.onload = function () {
  document.querySelector("#preloader").classList.add("hide-preloader");
};

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

// 

function generateImage() {
    html2canvas(document.body).then(function (canvas) {
      let imgData = canvas.toDataURL("image/png");
      let img = document.createElement("img");
      img.src = imgData;
      let link = document.createElement("a");
      link.href = imgData;
      link.download = "quote.png";
      link.appendChild(img);
      let notification = document.querySelector("#notification");
      notification.innerHTML = "";
      notification.appendChild(link);
    });
  }
  
  soundBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${quoteText.innerText} by ${authorName.innerText}`
      );
      utterance.pitch = 2.5; // Change the pitch to make the voice sound lower
      utterance.rate = 0.5; // Change the rate to make the voice speak slower
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
  
  printBtn.addEventListener("click", generateImage);
  
  quoteBtn.addEventListener("click", randomQuote);
  
  
  
  