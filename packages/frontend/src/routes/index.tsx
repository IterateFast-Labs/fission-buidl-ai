import { createFileRoute } from '@tanstack/react-router';
import Prompt from '@/components/prompt';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Prompt />
    </div>
  );
}
