// Add book form
const add_book_form = document.querySelector('#add-book-form');

// Add book form inputs
const book_img_input = document.querySelector('#book-img');
const book_name_input = document.querySelector('#book-name');
const book_keywords_input = document.querySelector('#book-keywords');
const book_briefing_input = document.querySelector('#book-briefing-input');
const book_author_input = document.querySelector('#book-author');
const book_pisbn_input = document.querySelector('#book-pisbn');
const book_eisbn_input = document.querySelector('#book-eisbn');
const book_catagory_input = document.querySelector('#book-catagory');

// Book preview card elements
const book_img_container = document.querySelector('.book-cover-img-container');
const book_keywords_container = document.querySelector('.book-keywords-container');
const book_name = document.querySelector('.book-name');
const book_author = document.querySelector('.book-author');
const book_briefing_text = document.querySelector('.book-briefing-text');
const book_pisbn = document.querySelector('.book-pisbn');
const isbn_separator = document.querySelector('.isbn-separator');
const book_eisbn = document.querySelector('.book-eisbn');
const book_catagory = document.querySelector('.book-catagory');

// Listen to user input and display it inside the card dynamically
book_name_input.addEventListener('input', () => {
    book_name.textContent = book_name_input.value;
});

book_author_input.addEventListener('input', () => {
    book_author.textContent = book_author_input.value;
});

book_briefing_input.addEventListener('input', () => {
    book_briefing_text.textContent = book_briefing_input.value;
});

book_catagory_input.addEventListener('input', () => {
    book_catagory.textContent = book_catagory_input.value;
});

book_keywords_input.addEventListener('input', () => {
    const keywordsArray = book_keywords_input.value.split(',').map(keyword => `<li><a href="#">${keyword.trim()}</a></li>`);
    book_keywords_container.innerHTML = keywordsArray.join('');
});

book_pisbn_input.addEventListener('input', () => {
    book_pisbn.textContent = `PISBN: ${book_pisbn_input.value}`;
});

book_eisbn_input.addEventListener('input', () => {
    book_eisbn.textContent = `EISBN: ${book_eisbn_input.value}`;
});

book_img_input.addEventListener('change', () => {
    const file = book_img_input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        book_img_container.style.backgroundImage = `url(${reader.result})`;
    }
});