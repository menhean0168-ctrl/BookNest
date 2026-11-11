# BookNest frontend

Vue 3 + TypeScript + Vite + Vue Router + Pinia, with a mock API from json-server.

## How to run

```sh
npm install
npm run api   # terminal 1: mock API at http://localhost:3000 (reads db.json)
npm run dev   # terminal 2: app at http://localhost:5173
```

Demo logins (any password of 8+ characters): `dara@example.com` (reader), `admin@example.com` (admin).

To reset the data, restore `db.json` from git (`git checkout db.json`). The API writes changes into it.

## Structure

- `db.json`: one array per entity, linked by ids (`categoryId`, `bookId`, `userId`).
- `src/api/`: `http.ts` plus one file per resource.
- `src/stores/`: Pinia stores (`books`, `reviews`, `auth`).
- `src/views/`, `src/components/`: pages and reusable components.

## Checks

```sh
npm run lint
npm run build
npm run test:unit
```

## State: store vs component

- **Store:** data shared across pages or loaded from the API (books, categories, reviews, `loading`, `error`) and the logged-in user.
- **Component:** state only one component needs (form fields, validation messages, search text).
- **Why:** shared data in one place avoids copies and refetching. Local UI state stays in the component so the store stays small.
