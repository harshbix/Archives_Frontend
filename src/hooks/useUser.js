import { useQueryClient } from '@tanstack/react-query';

const USER_QUERY_KEY = ['user'];

export const useUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(USER_QUERY_KEY);
  return {
    data: user || null,
    isLoading: false,
    isError: false,
  };
};

export const setUser = (queryClient, userData) => {
  queryClient.setQueryData(USER_QUERY_KEY, userData);
};
