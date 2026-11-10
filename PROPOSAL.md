# BookNest

## Problem
People who want a good book to read have no simple place to see honest ratings and reviews from other readers. BookNest is a small book review site where readers rate and review books out of 5 stars, and an admin keeps the catalogue clean.

## Users and roles
- Reader: browses and searches books, rates and reviews them, suggests missing books, and keeps a reading list.
- Admin: approves or rejects suggested books, and manages categories and books.

## User stories
1. As a reader, I want to register and log in so that my reviews are linked to my account.
   Accepted when: email and password (min 8 characters) are validated; the password is stored hashed; wrong credentials show a clear error.

2. As a reader, I want to search books by title or author and filter by category so that I can find a book quickly.
   Accepted when: results show 10 per page; search and category filter work together; no match shows "No books found".

3. As a reader, I want to rate a book from 1 to 5 stars, with an optional written review, so that others can see what I think.
   Accepted when: the rating is a whole number from 1 to 5; the text is optional; a user can review a book only once; the review appears on the book page right away.

4. As a reader, I want to edit or delete my own review so that I can fix or remove it.
   Accepted when: only the owner can change it; editing another user's review returns 403.

5. As a reader, I want to suggest a book that is not in the catalogue so that it can be added.
   Accepted when: only title, author and category are required; the suggestion is saved as "pending" and hidden from other readers.

6. As an admin, I want to review suggested books, add the description and cover, and approve or reject them so that the catalogue stays clean.
   Accepted when: only admins can see the pending list; the admin can edit the book's details before approving; approved books become public.

7. As an admin, I want to manage categories and edit or delete books so that the catalogue stays organised.
   Accepted when: only admins can do this; a category that still has books cannot be deleted.

8. As a reader, I want to see the average rating of each book so that I can judge it at a glance.

9. As a reader, I want a reading list so that I can keep track of books.

## MVP scope
Must have: story 1, 2, 3, 4, 5, 6, 7
Nice to have: story 8, 9

## Which story did you cut, and why?
I moved stories 8 (average rating) and 9 (reading list) out of the MVP and made them nice-to-have.

- **Story 9 (reading list):** it adds a whole extra entity (ReadingListItem), its own endpoints, and its own page. It does not support the core idea of the app, which is reviews plus the suggestion and approval flow.
- **Story 8 (average rating):** readers can already judge a book from its individual reviews, so it is a convenience, not a requirement. It is also cheap to add later because it only calculates over existing Review data.

I kept stories 5 and 6 (suggest a book, admin approves or rejects) in the MVP because that workflow is what makes BookNest different from a basic recipe-and-reviews app. The time saved goes to search with pagination (story 2) and to tests.

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | name, email, passwordHash, role | has many Reviews, ReadingListItems; suggests many Books |
| Category | name | has many Books |
| Book | title, author, description, year, coverUrl, status (pending / approved / rejected) | belongs to Category; has many Reviews |
| Review | rating (1-5), text (optional) | belongs to User and Book; one per user per book |
| ReadingListItem | status (want to read / read) | links User and Book (many-to-many) |

## Stretch feature
One of: search + pagination.
What it does in this app: readers search books by title or author, filter by category, and browse results 10 per page.

## Repository
https://github.com/menhean0168-ctrl/BookNest.git
