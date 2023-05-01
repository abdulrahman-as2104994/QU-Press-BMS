import * as repo from "../repo.js";

export async function GET(request) {
    const books = await repo.getBooks();
    return Response.json(books);
}
