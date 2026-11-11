# Component trees: BookNest

Rule used everywhere: props go down, events go up. A component owns state only if no other component needs to change it.

## 1. Book list (`/`) — built

```
BookListView
├── SearchBar
└── BookCard (one per book)
```

| Component | Props | Events | State owned |
|---|---|---|---|
| BookListView | none | none | `query`, `categoryId` (filters), `visibleBooks` (computed) |
| SearchBar | `categories` | `update:query`, `update:categoryId` (v-model) | none (value lives in BookListView) |
| BookCard | `book`, `categoryName` | `select(id)` | none |

## 2. Book detail (`/books/:id`) — built

```
BookDetailView
└── ReviewItem (one per review)
```

| Component | Props | Events | State owned |
|---|---|---|---|
| BookDetailView | none (reads `:id` from route) | none | `reviews` list, `book` (computed from route) |
| ReviewItem | `review`, `userName`, `canEdit` | `delete(id)` | none |

## 3. Suggest a book (`/suggest`) — built

```
SuggestBookView
└── SuggestBookForm
```

| Component | Props | Events | State owned |
|---|---|---|---|
| SuggestBookView | none | none | `suggested` list, success `message` |
| SuggestBookForm | `categories` | `submit(suggestion)` | `form` fields, `errors` (local, only the form needs them) |

## 4. Admin pending list (`/admin/pending`) — built

```
AdminPendingView
└── PendingBookRow (one per pending book)
```

| Component | Props | Events | State owned |
|---|---|---|---|
| AdminPendingView | none | none | pending books list |
| PendingBookRow | `book`, `categoryName` | `approve(id)`, `reject(id)` | none |

## 5. Admin manage catalogue (`/admin/catalogue`) — built

```
AdminCatalogueView
├── SearchBar (reused: search + category filter)
├── AdminBookRow (one per book)
└── CategoryPanel
    └── CategoryTile (one per category)
```

| Component | Props | Events | State owned |
|---|---|---|---|
| AdminCatalogueView | none | none | books and categories lists, filters (`query`, `categoryId`, sort), current page |
| SearchBar | `categories` | `update:query`, `update:categoryId` | none |
| AdminBookRow | `book`, `categoryName`, `averageRating`, `reviewCount` | `edit(id)`, `delete(id)` | none |
| CategoryPanel | `categories`, `bookCountByCategory` | `add(name)` | new category `name` input and its error |
| CategoryTile | `category`, `bookCount` | `delete(id)` (delete disabled when `bookCount > 0`) | none |

Admin-only: the route is guarded by `role === 'admin'` (story 7).

## State: store vs component (M1 answer)

- **Store (Pinia):** data shared across pages or loaded from the API: books, categories, the current book, reviews, `loading`, `error`, and the logged-in user.
- **Component:** state only one component needs: form field values and validation messages, search text, and open/closed UI state.
- **Why:** shared data in one place avoids copying it between pages and refetching it. Local UI state in the component keeps the store small and the component easy to reuse.
