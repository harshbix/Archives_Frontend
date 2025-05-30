import { useQuery, useQueryClient } from '@tanstack/react-query';

const USER_QUERY_KEY = ['user'];

export const useUser = () => {
  return useQuery(USER_QUERY_KEY, {
    // This query can be enhanced to fetch user data from an API if needed
    // For now, it reads from localStorage or returns null
    queryFn: () => {
      const role = localStorage.getItem('role');
      return role ? { role } : null;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const setUser = (queryClient, userData) => {
  queryClient.setQueryData(USER_QUERY_KEY, userData);
};
