import { useMutation, useQueryClient } from '@tanstack/react-query';
import booksApi from '../../api/booksApi';
import { Book } from '../../types';

export default function useAddOrUpdateBookShelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: booksApi.update,
    onSuccess({ book: addedBook, shelf }) {
      queryClient.setQueryData<Book[]>(['books'], prevBooks => {
        // Update book if found in global state
        if (prevBooks?.some(book => book.id === addedBook.id)) {
          return prevBooks?.map(book =>
            book.id !== addedBook.id
              ? book
              : {
                  ...book,
                  shelf,
                },
          );
        }

        // add the book if not found in global state
        return [...(prevBooks || []), { ...addedBook, shelf }];
      });
    },
  });
}
