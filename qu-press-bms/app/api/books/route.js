import * as repo from "../repo.js";

export async function GET(request) {
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
