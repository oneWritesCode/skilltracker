
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <main className="">{children}</main>
    </div>
  );
}
