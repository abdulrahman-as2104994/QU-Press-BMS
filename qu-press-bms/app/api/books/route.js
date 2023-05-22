import * as repo from "../repo.js";

export async function GET(request) {
    // surrond with try catch
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id');
        const isbn = searchParams.get('isbn');
        const title = searchParams.get('title');
        const includes = searchParams.get('includes');
        const author = searchParams.get('author');
        const category = searchParams.get('category');
        if (id) {
            const response = await repo.getBook(id);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by ID"})
            }
        }
        if (isbn) {
            const response = await repo.getBookByISBN(isbn);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by ISBN"})
            }
        }
        if (title) {
            const response = await repo.getBookByExactTitle(title);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by Title"})
            }
        }
        if (includes) {
            const response = await repo.getBookByTitleIncludes(includes);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by Title"})
            }
        }
        if (author) {
            const response = await repo.getBookByAuthor(author);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by Author"})
            }
        }
        if (category) {
            const response = await repo.getBookByCategory(category);
            if (response.done) {
                return Response.json(response.book);
            } else {
                return Response.json({error: "Book not found by Category"})
            }
        }
        const books = await repo.getBooks();
        return Response.json(books);
    } catch(err) {
        console.log(err);
    }

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
