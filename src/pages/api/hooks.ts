// src/pages/api/hooks.ts

import { supabase } from '@/utility';
import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  UseQueryResult, 
  UseMutationResult 
} from '@tanstack/react-query';

/**
 * useFetch - pobiera tablicę rekordów z podanej tabeli
 * @template T
 * @param {string} key - klucz zapytania React Query
 * @param {string} table - nazwa tabeli w Supabase
 * @returns {UseQueryResult<T[], Error>}
 */
export function useFetch<T = any>(
  key: string, 
  table: string
): UseQueryResult<T[], Error> {
  return useQuery({
    queryKey: [key],
    queryFn: async (): Promise<T[]> => {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      return data || [];
    }
  });
}

/**
 * useInsert - wstawia rekord do podanej tabeli i odświeża zapytanie
 * @template T
 * @param {string} key - klucz zapytania React Query do odświeżenia
 * @param {string} table - nazwa tabeli w Supabase
 * @returns {UseMutationResult<T[], Error, T>}
 */
export function useInsert<T = any>(
  key: string, 
  table: string
): UseMutationResult<T[], Error, T> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: T): Promise<T[]> => {
      const { data, error } = await supabase.from(table).insert(payload);
      if (error) throw error;
      return data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    }
  });
}