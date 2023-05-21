const form = document.querySelector(".search-section-form");
const searchInput = document.querySelector("#search-section-form-input");
form.addEventListener('submit', async (e) => handleSearch(e));

const searchMethodInput = document.querySelector("#search-method");
searchMethodInput.addEventListener('change', async (e) => handleSearchMethodChange(e));

async function handleSearchMethodChange(e) {
    e.preventDefault();
    const searchMethod = searchMethodInput.value;
    if (searchMethod == "isbn") {
        searchInput.setAttribute("placeholder", "Enter pISBN or eISBN");
    } else if (searchMethod == "id") {
        searchInput.setAttribute("placeholder", "Enter book id");
    } else if (searchMethod == "title") {
        searchInput.setAttribute("placeholder", "Enter book title");
    } else if (searchMethod == "any") {
        searchInput.setAttribute("placeholder", "Enter book id or book pISBN or book eISBN");
    }
}

async function handleSearch(e) {
    e.preventDefault();
    const searchMethod = searchMethodInput.value;
    if (searchMethod == "isbn") {
        await searchByISBN();
    } else if (searchMethod == "id") {
        await searchByID();
    } else if (searchMethod == "title") {
        await searchByTitle();
    } else if (searchMethod == "any") {
        await searchByAny();
    }
}

async function searchByISBN() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?isbn=${searchValue}`);
        const book = await response.json();
        if (book.error) {
            console.log(book.error);
            return false;
        }
        else {
            console.log(book);
            return true;
        }
    }
}

async function searchByID() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?id=${searchValue}`);
        const book = await response.json();
        if (book.error) {
            console.log(book.error);
            return false;
        }
        else {
            console.log(book);
            return true;
        }
    }
}

async function searchByTitle() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?title=${searchValue}`);
        const book = await response.json();
        if (book.error) {
            console.log(book.error);
            return false;
        }
        else {
            console.log(book);
            return true;
        }
    }
}

async function searchByAny() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const isbnSearch = await searchByISBN();
        if (isbnSearch) 
            return true;
        const idSearch = await searchByID();
        if (idSearch) 
            return true;
        
        const titleSearch = await searchByTitle();
        if (titleSearch)
            return true;
    }

}