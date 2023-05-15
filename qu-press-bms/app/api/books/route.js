import * as repo from "../repo.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    const isbn = searchParams.get('isbn');
    if (id) {
        const response = await repo.getBook(id);
        if (response.done) {
            return Response.json(response.book);
        } else {
            return Response.json({error: "Book not found"})
        }
    }
    if (isbn) {
        const response = await repo.getBookByISBN(isbn);
        if (response.done) {
            return Response.json(response.book);
        } else {
            return Response.json({error: "Book not found"})
        }
    }
    const books = await repo.getBooks();
    return Response.json(books);
}


export async function POST(request) {
    try {
        const book = await request.json();
        const response = await repo.addBook(book);
        return response;
    } catch(err) {
        console.log(err);
    }
}
