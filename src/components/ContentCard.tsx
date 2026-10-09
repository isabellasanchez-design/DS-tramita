export function ContentCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}
