const form = document.querySelector(".search-section-form");
const searchInput = document.querySelector("#search-section-form-input");
form.addEventListener('submit', async (e) => handleSearch(e));

const searchMethodInput = document.querySelector("#search-method");
searchMethodInput.addEventListener('change', async (e) => handleSearchMethodChange(e));

const booksTable = document.querySelector(".results-section-table");

const errorContainer = document.querySelector(".error-section .container");
const errorSectionText = document.querySelector(".error-section-text");

async function handleSearchMethodChange(e) {
    e.preventDefault();
    const searchMethod = searchMethodInput.value;
    if (searchMethod == "isbn") {
        searchInput.setAttribute("placeholder", "Enter pISBN or eISBN");
    } else if (searchMethod == "id") {
        searchInput.setAttribute("placeholder", "Enter book id");
    } else if (searchMethod == "title") {
        searchInput.setAttribute("placeholder", "Enter book title");
    } else if (searchMethod == "includes") {
        searchInput.setAttribute("placeholder", "Enter what the book title includes");
    } else if (searchMethod == "author") {
        searchInput.setAttribute("placeholder", "Enter book author");
    } else if (searchMethod == "category") {
        searchInput.setAttribute("placeholder", "Enter book category");
    } else if (searchMethod == "any") {
        searchInput.setAttribute("placeholder", "ID / ISBN / Title / Title includes / Author / Category");
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
    } else if (searchMethod == "includes") {
        await searchByTitleIncludes();
    } else if (searchMethod == "author") {
        await searchByAuthor();
    } else if (searchMethod == "category") {
        await searchByCategory();
    } else if (searchMethod == "any") {
        await searchByAny();
    }
}

async function createRows(book) {
    errorContainer.style.display = "none";
    booksTable.innerHTML = "";

    const header = document.createElement("thead");
    header.innerHTML = `
        <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Keywords</th>
            <th>pISBN</th>
            <th>eISBN</th>
            <th>Abstract</th>
        </tr>
    `;
    booksTable.appendChild(header);

    const tableBody = document.createElement("tbody");
    book.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index+1}</td>
            <td>${book["Book Title"]}</td>
            <td>${book["Author / Translator"]}</td>
            <td>${book["Category"]}</td>
            <td>${book["Keywords"]}</td>
            <td>${book["pISBN"]}</td>
            <td>${book["eISBN"]}</td>
            <td>${book["Abstract about Book"]}</td>
        `;
        tableBody.appendChild(row);
    });
    booksTable.appendChild(tableBody);
}

async function searchByCategory() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?category=${searchValue}`);
        const book = await response.json();
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by category");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by category";
            return false;
        }
        else {
            // Call a function to handle creation of table rows for the books
            createRows(book);
            console.log(book);
            return true;
        }
    }
}

async function searchByAuthor() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?author=${searchValue}`);
        const book = await response.json();
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by author");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by author";
            return false;
        }
        else {
            createRows(book);
            console.log(book);
            return true;
        }
    }
}

async function searchByISBN() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?isbn=${searchValue}`);
        const book = await response.json();
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by ISBN");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by ISBN";
            return false;
        }
        else {
            createRows(book);
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
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by ID");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by ID";
            return false;
        }
        else {
            createRows(book);
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
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by title");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by title";
            return false;
        }
        else {
            createRows(book);
            console.log(book);
            return true;
        }
    }
}

async function searchByTitleIncludes() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const response = await fetch(`../api/books?includes=${searchValue}`);
        const book = await response.json();
        if (book.error || book.length == 0) {
            console.log(book.error || "Book not found by title includes");
            booksTable.innerHTML = "";
            errorContainer.style.display = "flex";
            errorSectionText.innerHTML = "Book not found by title includes";
            return false;
        }
        else {
            createRows(book);
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

        const includesSearch = await searchByTitleIncludes();
        if (includesSearch)
            return true;
        
        const authorSearch = await searchByAuthor();
        if (authorSearch)
            return true;
        
        const categorySearch = await searchByCategory();
        if (categorySearch)
            return true;
        errorContainer.style.display = "flex";
        errorSectionText.innerHTML = "Book not found";
    }

}