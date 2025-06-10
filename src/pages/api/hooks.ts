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

/**
 * useUpdate - aktualizuje rekord w podanej tabeli i odświeża zapytanie
 * @template T
 * @param {string} key - klucz zapytania React Query do odświeżenia
 * @param {string} table - nazwa tabeli w Supabase
 * @returns {UseMutationResult<T[], Error, { id: string, updates: Partial<T> }>}
 */
export function useUpdate<T = any>(
  key: string, 
  table: string
): UseMutationResult<T[], Error, { id: string, updates: Partial<T> }> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<T> }): Promise<T[]> => {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)  // Keep as string for UUID comparison
        .select();
      if (error) throw error;
      return data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      queryClient.invalidateQueries({ queryKey: ['lesson-edit'] });
      queryClient.invalidateQueries({ queryKey: ['lesson-detail'] });
    }
  });
}

/**
 * useDelete - usuwa rekord z podanej tabeli i odświeża zapytanie
 * @param {string} key - klucz zapytania React Query do odświeżenia
 * @param {string} table - nazwa tabeli w Supabase
 * @returns {UseMutationResult<void, Error, { id: string }>}
 */
export function useDelete(
  key: string, 
  table: string
): UseMutationResult<void, Error, { id: string }> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id }: { id: string }): Promise<void> => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      queryClient.invalidateQueries({ queryKey: ['lesson-detail'] });
      queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
    }
  });
}