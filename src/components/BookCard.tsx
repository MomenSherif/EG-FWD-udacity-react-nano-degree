import { useState, type ChangeEvent, type ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { RiLoader2Line } from 'react-icons/ri';
import { Book, Shelf, shelfMap } from '../types';
import { isPromise } from '../utils';

const shelves = Object.keys(shelfMap) as Shelf[];

export type BookCardProps = {
  book: Book;
  onChangeShelf(shelf: Shelf): unknown | Promise<unknown>;
};

export default function BookCard({ book, onChangeShelf }: BookCardProps) {
  const { title, authors, imageLinks, shelf = 'currentlyReading' } = book;
  const [isLoading, setIsLoading] = useState(false);

  const handleShelfChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const mutationResult = onChangeShelf(e.target.value as Shelf);
    if (!isPromise(mutationResult)) return;
    setIsLoading(true);
    mutationResult.finally(() => setIsLoading(false));
  };

  return (
    <article className="relative bg-slate-900 shadow-lg rounded-xl ">
      <div className="relative">
        <Ribbon>{shelfMap[shelf]}</Ribbon>
        <img
          className="h-72 w-full object-cover  rounded-t-lg"
          src={imageLinks.thumbnail}
          alt={title}
        />

        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 gradient-bg w-10 h-10 rounded-full inline-flex justify-center items-center">
          {isLoading ? (
            <RiLoader2Line
              className="w-5 h-5 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <FaChevronDown className="mt-1" aria-hidden="true" />
          )}
          <select
            disabled={isLoading}
            className="text-black bg-red-300 absolute w-full h-full opacity-0 cursor-pointer"
            value={shelf}
            onChange={handleShelfChange}
          >
            <option value="" disabled>
              Move to...
            </option>
            {shelves.map(shelf => (
              <option key={shelf} value={shelf}>
                {shelfMap[shelf]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium gradient-text">{title}</h3>
        <div className="divide-y divide-gray-800">
          {authors?.map((author, idx) => (
            <p key={idx} className="text-sm text-gray-400 py-1">
              {author}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

const Ribbon = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-0 h-40 w-full overflow-hidden">
    <div className="absolute left-0 top-0 h-16 w-16 z-10">
      <div className="absolute transform -rotate-45 bg-slate-900 text-white text-xs text-center font-medium py-2 left-[-37px] top-[32px] w-[170px]">
        {children}
      </div>
    </div>
  </div>
);
