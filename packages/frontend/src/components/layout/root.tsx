export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto min-h-svh">
      {children}
    </div>
  );
}
