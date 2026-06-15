export function ColumnGrid() {
  return (
    <div className="fixed inset-0 w-[100vw] max-w-[100vw] h-full pointer-events-none z-0 px-5 md:px-8 mx-auto grid grid-cols-4">
      <div className="border-l border-r border-[var(--border-overlay)] h-full" />
      <div className="border-r border-[var(--border-overlay)] h-full" />
      <div className="border-r border-[var(--border-overlay)] h-full" />
      <div className="border-r border-[var(--border-overlay)] h-full" />
    </div>
  );
}
