const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter");
// randomQuotefunction
function randomQuote() {
    quoteBtn.classList.add("loading")
    quoteBtn.innerText = "Loading Quote...";
    // getting random quote from the API and parsing int o Javascript object
 fetch("https://api.quotable.io/random").then(res=>res.json()).then(result=>{  
quoteText.innerText = result.content;
authorName.innerText = result.author;
quoteBtn.innerText = "Another One";
quoteBtn.classList.remove("loading")
 }); 

}

// soundBtn.addEventListener("click", () => {
//     // speech synthesis is a web speech api that represents a speech request ]
//     let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
//     speechSynthesis.speak(utterance)//speak method of speechSynthesis speaks the utterance
// });
// let utterance; // declare a variable to store the current utterance
// soundBtn.addEventListener("click", () => {
//     // control speaking and not speaking
//     speechSynthesis.speaking ? speechSynthesis.cancel() : 
//     (utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`), 
//     speechSynthesis.speak(utterance));
//   });
soundBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    // stop the current utterance if it's already speaking
    speechSynthesis.cancel();
  } else {
    // create a new utterance and speak it
    utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
  }
});

copyBtn.addEventListener("click", () => {
    // copying the quote text on copyBtn click
    // writeText() property writes the spectified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText);
   
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl =`https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");  // opens a twitter tab
});

quoteBtn.addEventListener("click", randomQuote);