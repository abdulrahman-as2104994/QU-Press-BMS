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
        return null;
    return book;
}