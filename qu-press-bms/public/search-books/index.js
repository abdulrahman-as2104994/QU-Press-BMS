const form = document.querySelector(".search-section-form");
form.addEventListener('submit', (e) => handleSearch(e));

function handleSearch(e) {
    e.preventDefault();
    const searchInput = document.querySelector(".search-section-input").value;
    const searchType = document.querySelector(".search-section-select").value;
    const searchQuery = searchInput.trim();
    if (searchQuery.length > 0) {
        window.location.href = `/search-books/${searchType}/${searchQuery}`;
    }
}
