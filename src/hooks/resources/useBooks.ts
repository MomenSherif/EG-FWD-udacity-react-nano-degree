import { useQuery } from '@tanstack/react-query';
import booksApi from '../../api/booksApi';

export default function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
  });
}
