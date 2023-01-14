import { useQuery } from '@tanstack/react-query';
import booksApi from '../../api/booksApi';

export default function useSearchBooks(query: string) {
  return useQuery({
    queryKey: ['search', { query }],
    queryFn: () => booksApi.search(query),
    enabled: !!query,
  });
}
