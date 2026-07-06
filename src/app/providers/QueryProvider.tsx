import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NETWORK_RETRY_COUNT } from '../../shared/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: NETWORK_RETRY_COUNT,
    },
  },
});

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // useFcmMessage();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
