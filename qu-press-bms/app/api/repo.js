import fs from 'fs';

const BOOKS_FILE_PATH = 'data/books.json';

export async function getBooks() {
    const books = await fs.promises.readFile(BOOKS_FILE_PATH, 'utf-8');
    return JSON.parse(books);
}

export async function getBook(id) {
    const books = await getBooks();
    const book = books.filter(book => book.id == id.trim());
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

export async function getBookByISBN(isbn) {
    const books = await getBooks();
    // .replace(/-/g, '').trim() to remove all dashes and spaces
    const book = books.filter(book => book["pISBN"].replace(/-/g, '').trim() == isbn.replace(/-/g, '').trim() || book["eISBN"].replace(/-/g, '').trim() == isbn.replace(/-/g, '').trim());
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

const levenshteinDistance = (str1 = '', str2 = '') => {
   const track = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
         );
      }
   }
   return track[str2.length][str1.length];
};

const MAX_EDIT_DISTANCE = 3;

export async function getBookByExactTitle(title) {
    const books = await getBooks();
    const book = books.filter(book => {
        const bookTitle = book["Book Title"].trim().toLowerCase();
        const searchTitle = title.trim().toLowerCase();

        const distance = levenshteinDistance(bookTitle, searchTitle);

        return distance <= MAX_EDIT_DISTANCE;
    })
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}


export async function getBookByTitleIncludes(title) {
    const books = await getBooks();
    const book = books.filter(book => book["Book Title"].trim().toLowerCase().includes(title.trim().toLowerCase()));
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

export async function getBookByAuthor(author) {
    const books = await getBooks();
    const book = books.filter(book => book["Author / Translator"].trim().toLowerCase().includes(author.trim().toLowerCase()));
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

export async function getBookByCategory(category) {
    const books = await getBooks();
    const book = books.filter(book => book["Category"].trim().toLowerCase().includes(category.trim().toLowerCase()));
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

export async function addBook(book) {
    const books = await getBooks();
    book.id = books.length + 1;
    books.push(book);
    const response = await fs.promises.writeFile(BOOKS_FILE_PATH, JSON.stringify(books));
    return response;
}