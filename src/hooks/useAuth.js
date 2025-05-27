import { useMutation } from '@tanstack/react-query';
import { loginApi, registerApi } from '../api/auth';

export const useLogin = (options) => {
  return useMutation(loginApi, options);
};

export const useRegister = (options) => {
  return useMutation(registerApi, options);
};
