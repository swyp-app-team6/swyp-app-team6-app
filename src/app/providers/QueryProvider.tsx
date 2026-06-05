import React, { useEffect } from 'react';
import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import useFcmMessage from '@/shared/firebase/useFcmMessage';
import { toast } from '@/shared/lib/toast';
import useAuthStore from '@/entities/user/model/authStore';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message ?? '데이터를 불러오지 못했습니다.');
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message ?? '요청에 실패했습니다.');
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const { hydrate } = useAuthStore();
  // useFcmMessage();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
