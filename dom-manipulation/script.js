const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = [
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'inspiration' },
    // Add more quotes here
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" 
 - ${randomQuote.author}`;
}

function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        showRandomQuote();
    }
}

newQuoteButton.addEventListener('click', showRandomQuote);

showRandomQuote(); // Display initial quote