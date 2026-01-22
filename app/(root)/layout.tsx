import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
