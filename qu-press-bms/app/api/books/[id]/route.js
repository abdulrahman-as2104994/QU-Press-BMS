import * as repo from "../../repo.js";

export async function GET(request, {params}) {
    try {
        const {id} = params;
        const response = await repo.getBook(id);
        if (response.done) {
            return Response.json(response.book);
        } else {
            return Response.json({error: "Book not found"})
        }
    } catch(err) {
        console.log(err);;
    }
}
