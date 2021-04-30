//when #new-quote button clicked, fetch and display a new quote in #text and #author
// set up variables
const endpoint ='/quotes.json';
const quotes= []
fetch(endpoint)
    .then(blob=>blob.json())
    .then(data=>quotes.push(...data));

const quoteText= document.querySelector('.text');
const quoteAuthor=document.querySelector('.author');
const newQuote=document.querySelector('.new-quote');

// function to display a random quote and author
function randomQuote() {
    var index=parseInt(Math.random() * quotes.length) - 1;
    const quote=quotes[index]['quote'];
    const author=quotes[index]['author'];
    quoteText.innerHTML = quote;
    quoteAuthor.innerHTML = author;
}

//first load displays random quote in #text and author in #author
window.onload = randomQuote();
// listener for need to display a new quote
newQuote.addEventListener('click', randomQuote);