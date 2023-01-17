import { Book, Shelf } from '../types';

const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

const getOne = (bookId: string): Promise<{ book: Book }> =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);

const getAll = (): Promise<Book[]> =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);

const update = ({ book, shelf }: { book: Book; shelf: Shelf }) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf: shelf || 'none' }),
  })
    .then(res => res.json())
    .then(() => ({
      book,
      shelf,
    }));

const search = (query: string): Promise<{ error: 'empty query' } & Book[]> =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults: 10 }),
  })
    .then(res => res.json())
    .then(data => data.books);

const booksApi = {
  getOne,
  getAll,
  update,
  search,
};

export default booksApi;
