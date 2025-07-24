export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
          <h1 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900">PoS Cashiers</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">{children}</div>
      </main>
    </>
  );
}
