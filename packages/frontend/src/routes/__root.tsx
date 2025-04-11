import { Outlet, createRootRoute } from '@tanstack/react-router';
import Providers from '../providers';
import RootLayout from '@/components/layout/root';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </Providers>
  );
}
