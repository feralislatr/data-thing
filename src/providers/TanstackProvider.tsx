'use client';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? localStorage : undefined,
});

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            gcTime: 1000 * 60 * 60 * 24, // 24 hrs
          },
        },
      }),
  );

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
