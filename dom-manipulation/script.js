const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteForm = document.getElementById('addQuoteForm');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

let quotes = [];
let currentCategory = 'all';

// Load quotes from local storage (if available)
const storedQuotes = localStorage.getItem('quotes');
if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
};
const storedCategory = localStorage.getItem('categoryFilter');
if (storedCategory) {
    currentCategory = storedCategory;
};

function showRandomQuote(category) {
    const filteredQuotes = category === 'all' ? quotes : quotes.filter(quote => quote.category === category);
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];

        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
    } else {
        quoteDisplay.textContent = 'No quotes found for this category.';
    };
}

// function showRandomQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     quoteDisplay.innerHTML = `"${randomQuote.text}" 
//  - ${randomQuote.author}`;
// };

function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        saveQuotes();
        showRandomQuote();
        updateCategories();

    };
};

function updateCategories() {
    const categories = new Set(quotes.map(quote => quote.category));
    categoryFilter.innerHTML = '';
    categoryFilter.appendChild(new Option('All Categories', 'all'));
    categories.forEach(category => {
        const option = new Option(category, category);
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = currentCategory;
};

function filterQuotes() {
    currentCategory = categoryFilter.value;
    localStorage.setItem('categoryFilter', currentCategory);
    showRandomQuote(currentCategory);
};

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
};

function exportQuotesToJson() {
    const jsonData = JSON.stringify(quotes);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();

    URL.revokeObjectURL(url);
};

function importFromJsonFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };

    reader.readAsText(file);
};

function createAddQuoteForm() {
    const listItem = document.createElement('li');
    listItem.textContent = quoteText;
    addQuoteForm.appendChild(listItem);

};

newQuoteButton.addEventListener('click', showRandomQuote);

showRandomQuote(currentCategory); // Display initial quote

importFile.addEventListener('change', importFromJsonFile);
updateCategories();