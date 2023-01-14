import { useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import LoadContent from '../components/LoadContent';
import PageHeading from '../components/PageHeading';
import SearchInput from '../components/SearchInput';
import useBooks from '../hooks/resources/useBooks';
import { useSearchBooks, useUpdateBookShelf } from '../hooks/resources';
import useDebounceValue from '../hooks/useDebounceValue';
import { Shelf } from '../types';

export default function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query);
  const { data: books, isFetching } = useSearchBooks(debouncedQuery);

  const { data: userBooks } = useBooks();
  const mutation = useUpdateBookShelf();

  const userBooksShelfMap = useMemo(() => {
    if (!userBooks) return {};
    return userBooks.reduce((acc, book) => {
      acc[book.id] = book.shelf;
      return acc;
    }, {} as Record<string, Shelf | undefined>);
  }, [userBooks]);

  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <PageHeading>Search for books to read</PageHeading>
        <div className="w-full max-w-lg">
          <SearchInput value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <LoadContent isLoading={isFetching}>
        {books?.error === 'empty query' && (
          <div role="alert" className="text-xl text-center text-slate-400">
            No result found
          </div>
        )}

        {!!books?.length && (
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-8 ">
            {books.map(book => (
              <div key={book.id} className="min-w-[240px] max-w-xs">
                <BookCard
                  book={{ ...book, shelf: userBooksShelfMap[book.id] }}
                  onChangeShelf={shelf => mutation.mutateAsync({ book, shelf })}
                />
              </div>
            ))}
          </div>
        )}
      </LoadContent>
    </>
  );
}
