
import Link from "next/link";
import StudentRoom from "@/components/StudentRoom";

export default function RoomPage() {
  return (
    <main className="min-h-screen w-full bg-[#edf2f3] text-slate-900">
      {/* Main header */}
      <header className="relative z-10 flex min-h-[76px] flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div>
          <p className="text-xl font-black tracking-tight">
            UPSA <span className="text-teal-600">LIFE</span>
          </p>
          <p className="text-xs text-slate-500">
            Your student life begins here
          </p>
        </div>

        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100"
        >
          Back Home
        </Link>
      </header>

      {/* Room content */}
      <section className="relative w-full">
        <StudentRoom />
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-5 text-center text-sm text-slate-500">
        UPSA Life · Your university, your choices, your life.
      </footer>
    </main>
  );
}
