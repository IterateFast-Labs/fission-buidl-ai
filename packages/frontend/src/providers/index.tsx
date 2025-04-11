import TanstackQueryProvider from './tanstack-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
