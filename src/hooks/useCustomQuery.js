import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import queryKeys from '../utils/queryKeys';
import queryConfig from '../utils/queryConfig';

export function useUsers() {
  return useQuery(
    queryKeys.users,
    async () => {
      const { data } = await apiClient.get('/users');
      return data;
    },
    queryConfig
  );
}

export function usePosts() {
  return useQuery(
    queryKeys.posts,
    async () => {
      const { data } = await apiClient.get('/posts');
      return data;
    },
    queryConfig
  );
}
