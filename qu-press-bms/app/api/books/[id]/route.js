import * as repo from "../../repo.js";

export async function GET(request, {params}) {
    const {id} = params;
    const book = await repo.getBook(id);
    return Response.json(book);
}
