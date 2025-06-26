import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 shadow bg-card flex justify-between items-center">
        <h1 className="text-xl font-bold">Challenges</h1>
        <nav className="space-x-4">
          <Link to="/problem-1" className="hover:underline">
            Problem 1
          </Link>
          <Link to="/problem-2" className="hover:underline">
            Problem 2
          </Link>
          <Link to="/problem-3" className="hover:underline">
            Problem 3
          </Link>
        </nav>
      </header>
      <main className="min-h-[calc(100vh_-_112px)]">
        <Outlet /> {/* 🧩 Nested route content goes here */}
      </main>
      <footer className="p-4 mt-auto bg-muted text-center text-sm">
        © {new Date().getFullYear()} My App
      </footer>
    </div>
  );
}
