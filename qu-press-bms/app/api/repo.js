import fs from 'fs';

const BOOKS_FILE_PATH = 'data/books.json';

export async function getBooks() {
    const books = await fs.promises.readFile(BOOKS_FILE_PATH, 'utf-8');
    return JSON.parse(books);
}

export async function getBook(id) {
    const books = await getBooks();
    const book = books.find(book => book.id == id);
    if (!book)
        return {done: false, book: null};
    return {done: true, book: book};
}

export async function getBookByISBN(isbn) {
    const books = await getBooks();
    const book = books.find(book => book.isbn == isbn);
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