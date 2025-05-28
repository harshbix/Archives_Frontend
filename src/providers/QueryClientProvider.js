import React from 'react';
import { QueryClientProvider as RQProvider } from '@tanstack/react-query';
import queryClient from '../utils/queryClient';

const QueryClientProvider = ({ children }) => {
  return React.createElement(RQProvider, { client: queryClient }, children);
};

export default QueryClientProvider;
