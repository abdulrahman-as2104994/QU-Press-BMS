import json

with open('data.json', 'r') as f:
    books = json.load(f)

for i, book in enumerate(books):
    book['id'] = i + 1  # set the id field to the index plus one

with open('books_with_ids.json', 'w') as f:
    json.dump(books, f, indent=2)
