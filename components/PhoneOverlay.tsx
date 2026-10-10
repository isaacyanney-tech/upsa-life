
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  name?: string;
  programme?: string;
  level?: string;
};

type AppName =
  | "Home"
  | "Profile"
  | "Academics"
  | "Wallet"
  | "Social"
  | "Settings";

const phoneApps: {
  name: Exclude<AppName, "Home">;
  icon: string;
  color: string;
  isNew?: boolean;
}[] = [
  { name: "Profile", icon: "👤", color: "bg-white text-slate-900" },
  { name: "Academics", icon: "📚", color: "bg-indigo-500" },
  { name: "Wallet", icon: "💳", color: "bg-emerald-500" },
  { name: "Social", icon: "💬", color: "bg-pink-500" },
  { name: "Settings", icon: "⚙️", color: "bg-slate-700" },
];

export default function PhoneOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeApp, setActiveApp] = useState<AppName>("Home");
  const [student, setStudent] = useState<Student | null>(null);
  const [balance, setBalance] = useState(500);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (!open) return;

    try {
      const saved = localStorage.getItem("upsaLifeStudent");
      setStudent(saved ? (JSON.parse(saved) as Student) : null);
    } catch {
      setStudent(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const studentName = student?.name?.trim() || "UPSA Student";

  function renderApp() {
    switch (activeApp) {
      case "Profile":
        return (
          <div className="space-y-4 text-white">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-4xl">
                🧑🏾‍🎓
              </div>
              <h2 className="mt-3 text-2xl font-black">{studentName}</h2>
              <p className="mt-1 text-sm text-white/75">
                {student?.programme || "Programme not set"}
              </p>
            </div>
            <Info label="University" value="UPSA, Accra" />
            <Info label="Level" value={student?.level || "Not set"} />
            <Link
              href="/create-student"
              onClick={onClose}
              className="block rounded-2xl bg-white px-4 py-3 text-center font-bold text-violet-800"
            >
              Edit student profile ↗
            </Link>
          </div>
        );

      case "Academics":
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-2xl font-black">Academics 📚</h2>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-white/70">Programme</p>
              <p className="mt-1 font-bold">
                {student?.programme || "Not set yet"}
              </p>
              <p className="mt-2 text-sm">
                {student?.level || "Level not set"}
              </p>
            </div>
            <Info label="Course registration" value="Coming soon" />
            <Info label="Timetable" value="Coming soon" />
            <Info label="Exam results" value="Coming soon" />
          </div>
        );

      case "Wallet":
        return (
          <div className="space-y-5 text-white">
            <h2 className="text-2xl font-black">My Wallet 💳</h2>
            <div className="rounded-3xl border border-white/20 bg-black/15 p-5">
              <p className="text-sm text-white/70">Virtual balance</p>
              <p className="mt-2 text-4xl font-black">
                GH₵ {balance.toFixed(2)}
              </p>
              <p className="mt-3 text-xs text-white/60">
                UPSA Life game currency
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBalance((value) => value + 50)}
                className="rounded-xl bg-white px-3 py-3 text-sm font-bold text-violet-800"
              >
                + GH₵50
              </button>
              <button
                onClick={() =>
                  setBalance((value) => Math.max(0, value - 20))
                }
                className="rounded-xl bg-black/20 px-3 py-3 text-sm font-bold text-white"
              >
                − GH₵20
              </button>
            </div>
            <p className="text-xs text-white/70">
              Demo only: this balance resets when the page reloads.
            </p>
          </div>
        );

      case "Social":
        return (
          <div className="space-y-4 text-white">
            <h2 className="text-2xl font-black">Campus Social 💬</h2>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-3xl">👋🏾</p>
              <p className="mt-3 text-lg font-bold">Meet your campus</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Friends, messages and campus activities will live here.
              </p>
            </div>
            <Info label="Friends" value="0" />
            <Info label="Messages" value="No messages yet" />
            <Info label="Reputation" value="New student" />
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-5 text-white">
            <h2 className="text-2xl font-black">Settings ⚙️</h2>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">Notifications</span>
              <button
                onClick={() => setNotifications((value) => !value)}
                aria-pressed={notifications}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-violet-800"
              >
                {notifications ? "On" : "Off"}
              </button>
            </div>
            <Info label="Game version" value="Early access" />
            <Info label="Location" value="UPSA, Accra" />
          </div>
        );

      default:
        return (
          <div className="text-white">
            <p className="text-sm text-white/75">Welcome back,</p>
            <h2 className="mt-1 text-3xl font-black">{studentName}</h2>
            <p className="mt-1 text-sm text-white/75">
              Saturday · Your student life
            </p>

            <div className="mt-6 grid grid-cols-3 gap-x-2 gap-y-6">
              {phoneApps.map((app) => (
                <button
                  key={app.name}
                  onClick={() => setActiveApp(app.name)}
                  className="flex min-w-0 flex-col items-center gap-2 rounded-xl p-1 transition hover:bg-white/10 active:scale-95"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] text-2xl shadow-lg ${app.color}`}
                  >
                    {app.icon}
                  </span>
                  <span className="text-center text-xs font-bold">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-white/20 bg-black/10 p-3">
              <p className="text-sm font-bold">✨ Student tip</p>
              <p className="mt-1 text-xs leading-5 text-white/75">
                Your phone is your hub for campus life. More apps will
                unlock as the game develops.
              </p>
            </div>
          </div>
        );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 px-3 py-5 backdrop-blur-md sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="UPSA Life smartphone"
    >
      <div className="flex max-h-full w-full max-w-[520px] flex-col items-center">
        <button
          onClick={onClose}
          className="mb-4 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
        >
          ✕ Close
        </button>

        <div className="w-full max-w-[330px] rounded-[3.2rem] border-[8px] border-[#171923] bg-[#171923] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:max-w-[360px]">
          <div className="relative overflow-hidden rounded-[2.55rem] bg-gradient-to-b from-[#3738ad] via-[#9139e9] to-[#ff9e19]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(255,255,255,0.25),transparent_45%)]" />
            <div className="pointer-events-none absolute -bottom-10 -left-12 h-48 w-[150%] rotate-[-8deg] bg-gradient-to-t from-orange-400/60 to-transparent" />

            <div className="relative flex h-9 items-center justify-between px-5 pt-1 text-xs font-bold text-white">
              <span>8:18 PM</span>
              <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#111218]" />
              <span>●● 4G ▰</span>
            </div>

            <div className="relative max-h-[min(660px,calc(100dvh-150px))] min-h-[490px] overflow-y-auto px-5 pb-5 pt-5 sm:min-h-[560px]">
              <div className="mb-6 flex items-center justify-between gap-3">
                {activeApp === "Home" ? (
                  <div>
                    <h2 className="text-4xl font-black tracking-tight text-white">
                      8:18
                    </h2>
                    <p className="mt-1 text-sm text-white/80">
                      Saturday 10 October · UPSA
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveApp("Home")}
                    className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white"
                  >
                    ‹ Home
                  </button>
                )}
                <span className="rounded-full bg-white/20 px-3 py-2 text-xs font-semibold text-white">
                  {activeApp === "Home" ? "🌙 Night" : activeApp}
                </span>
              </div>

              {renderApp()}

              <div className="mt-7 flex justify-center">
                <button
                  onClick={() => setActiveApp("Home")}
                  aria-label="Phone home"
                  className="h-1.5 w-24 rounded-full bg-white/80"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/70">
          UPSA LIFE · In-game smartphone
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/20 py-3 text-sm">
      <span className="text-white/70">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}
