import BookCard from '../components/BookCard';
import LoadContent from '../components/LoadContent';
import PageHeading from '../components/PageHeading';
import useBooks from '../hooks/resources/useBooks';
import { useUpdateBookShelf } from '../hooks/resources';
import { Shelf, shelfMap } from '../types';

const shelves = Object.keys(shelfMap) as Shelf[];

export default function Home() {
  const { data: books, isFetching } = useBooks();
  const mutation = useUpdateBookShelf();

  return (
    <>
      <PageHeading>My Reads</PageHeading>

      <LoadContent
        isLoading={isFetching}
        loaderContainerProps={{ className: 'mt-20' }}
      >
        <div className="mt-10 space-y-24">
          {shelves.map(shelf => (
            <section key={shelf} className="flex flex-col">
              <h2 className="relative text-2xl font-medium mb-10 after:content-[''] after:absolute after:left-0 after:top-full after:w-24 after:h-1 after:mt-2 after:rounded-sm after:from-pink-400 after:to-red-600 after:bg-gradient-to-b">
                {shelfMap[shelf]}
              </h2>
              <div className="flex flex-wrap justify-center gap-y-6 gap-x-8 ">
                {books
                  ?.filter(book => book.shelf === shelf)
                  .map(book => (
                    <div key={book.id} className="min-w-[240px] max-w-xs">
                      <BookCard
                        book={book}
                        onChangeShelf={shelf =>
                          mutation.mutateAsync({
                            book,
                            shelf,
                          })
                        }
                      />
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </LoadContent>
    </>
  );
}
