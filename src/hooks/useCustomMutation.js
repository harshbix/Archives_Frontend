import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import queryKeys from '../utils/queryKeys';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newUser) => {
      const { data } = await apiClient.post('/users', newUser);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.users);
      },
    }
  );
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedPost) => {
      const { data } = await apiClient.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.posts);
      },
    }
  );
}
