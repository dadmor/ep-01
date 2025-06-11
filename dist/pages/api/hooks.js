// src/pages/api/hooks.ts
import { supabase } from '@/utility';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
/**
 * useFetch - pobiera tablicę rekordów z podanej tabeli
 * @template T
 * @param {string} key - klucz zapytania React Query
 * @param {string} table - nazwa tabeli w Supabase
 * @returns {UseQueryResult<T[], Error>}
 */
export function useFetch(key, table) {
    return useQuery({
        queryKey: [key],
        queryFn: async () => {
            const { data, error } = await supabase.from(table).select('*');
            if (error)
                throw error;
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
export function useInsert(key, table) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const { data, error } = await supabase.from(table).insert(payload);
            if (error)
                throw error;
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
export function useUpdate(key, table) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updates }) => {
            const { data, error } = await supabase
                .from(table)
                .update(updates)
                .eq('id', id) // Keep as string for UUID comparison
                .select();
            if (error)
                throw error;
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
export function useDelete(key, table) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id }) => {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
            queryClient.invalidateQueries({ queryKey: ['lesson-detail'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        }
    });
}
