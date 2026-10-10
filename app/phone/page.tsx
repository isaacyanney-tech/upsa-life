
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  name?: string;
  programme?: string;
  level?: string;
  skinTone?: string;
  hairstyle?: string;
  shirtColor?: string;
};

type AppName =
  | "Home"
  | "Profile"
  | "Academics"
  | "Wallet"
  | "Social"
  | "Settings";

const apps: {
  name: AppName;
  icon: string;
  color: string;
}[] = [
  { name: "Profile", icon: "👤", color: "bg-sky-100" },
  { name: "Academics", icon: "📚", color: "bg-violet-100" },
  { name: "Wallet", icon: "💳", color: "bg-emerald-100" },
  { name: "Social", icon: "💬", color: "bg-pink-100" },
  { name: "Settings", icon: "⚙️", color: "bg-slate-200" },
];

export default function PhonePage() {
  const [activeApp, setActiveApp] = useState<AppName>("Home");
  const [student, setStudent] = useState<Student | null>(null);
  const [balance, setBalance] = useState(500);
  const [brightness, setBrightness] = useState(80);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("upsaLifeStudent");
      if (saved) setStudent(JSON.parse(saved) as Student);
    } catch {
      setStudent(null);
    }
  }, []);

  const studentName = student?.name?.trim() || "UPSA Student";

  function renderApp() {
    switch (activeApp) {
      case "Profile":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-4xl">
                🧑🏾‍🎓
              </div>
              <h2 className="mt-3 text-xl font-bold">{studentName}</h2>
              <p className="text-sm text-slate-500">
                {student?.programme || "Programme not set"}
              </p>
            </div>
            <InfoRow label="Level" value={student?.level || "Not set"} />
            <InfoRow label="University" value="UPSA, Accra" />
            <Link
              href="/create-student"
              className="block rounded-xl bg-teal-700 px-4 py-3 text-center font-semibold text-white"
            >
              Edit Student
            </Link>
          </div>
        );

      case "Academics":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">My Academics</h2>
            <div className="rounded-2xl bg-violet-50 p-4">
              <p className="text-sm text-violet-700">Current programme</p>
              <p className="mt-1 font-bold">
                {student?.programme || "Choose your programme"}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {student?.level || "Level not set"}
              </p>
            </div>
            <InfoRow label="Course registration" value="Coming soon" />
            <InfoRow label="Timetable" value="Coming soon" />
            <InfoRow label="Results" value="Coming soon" />
            <p className="text-xs leading-5 text-slate-500">
              Academic features will be connected to the game progression
              system in a later update.
            </p>
          </div>
        );

      case "Wallet":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">My Wallet</h2>
            <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-600 p-5 text-white">
              <p className="text-sm text-teal-100">Game balance</p>
              <p className="mt-2 text-3xl font-black">
                GH₵ {balance.toFixed(2)}
              </p>
              <p className="mt-4 text-xs text-teal-100">
                UPSA Life virtual money
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBalance((value) => value + 50)}
                className="rounded-xl border border-slate-200 p-3 font-semibold hover:bg-slate-50"
              >
                ＋ Add GH₵50
              </button>
              <button
                onClick={() =>
                  setBalance((value) => Math.max(0, value - 20))
                }
                className="rounded-xl border border-slate-200 p-3 font-semibold hover:bg-slate-50"
              >
                − Spend GH₵20
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Demo controls only. This balance resets when the page reloads.
            </p>
          </div>
        );

      case "Social":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Campus Social</h2>
            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-3xl">👋</p>
              <h3 className="mt-2 font-bold">Meet campus life</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your friendships, conversations, and campus activities
                will appear here.
              </p>
            </div>
            <InfoRow label="Friends" value="0" />
            <InfoRow label="Messages" value="No messages yet" />
            <InfoRow label="Reputation" value="New student" />
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold">Settings</h2>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="brightness" className="font-medium">
                  Screen brightness
                </label>
                <span className="text-sm text-slate-500">
                  {brightness}%
                </span>
              </div>
              <input
                id="brightness"
                type="range"
                min="30"
                max="100"
                value={brightness}
                onChange={(event) =>
                  setBrightness(Number(event.target.value))
                }
                className="mt-3 w-full accent-teal-700"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">Notifications</span>
              <button
                onClick={() => setNotifications((value) => !value)}
                aria-pressed={notifications}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  notifications
                    ? "bg-teal-100 text-teal-800"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {notifications ? "On" : "Off"}
              </button>
            </div>
            <p className="text-sm text-slate-500">
              More game settings will be added later.
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500">Welcome back,</p>
              <h2 className="text-2xl font-black">{studentName}</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your university. Your choices. Your life.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-600 p-4 text-white">
              <p className="text-sm text-teal-100">UPSA LIFE</p>
              <p className="mt-2 text-xl font-bold">Your student phone</p>
              <p className="mt-1 text-sm text-teal-100">
                Everything you need for campus life.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-5">
              {apps.map((app) => (
                <button
                  key={app.name}
                  onClick={() => setActiveApp(app.name)}
                  className="flex flex-col items-center gap-2 rounded-xl p-1 text-center transition hover:bg-slate-100"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${app.color}`}
                  >
                    {app.icon}
                  </span>
                  <span className="text-xs font-semibold">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm font-bold">Student tip</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Set up your student profile to personalize your phone.
              </p>
            </div>
          </div>
        );
    }
  }

  return (
    <main className="min-h-screen bg-[#e9eeee] px-4 py-8 text-slate-900 sm:px-6">
      <header className="mx-auto mb-8 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-xl font-black tracking-tight">
          UPSA <span className="text-teal-700">LIFE</span>
        </Link>
        <Link
          href="/room"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
        >
          Back to My Room
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="text-center lg:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Phase 4
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Your phone.
            <br />
            Your student life.
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600 lg:mx-0">
            Manage your student profile, academics, virtual money, and
            social life from one place.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/create-student"
              className="rounded-xl bg-teal-800 px-5 py-3 font-semibold text-white transition hover:bg-teal-900"
            >
              Student Creator
            </Link>
            <Link
              href="/room"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold transition hover:bg-slate-50"
            >
              Visit My Room
            </Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[340px] rounded-[2.8rem] border-[7px] border-slate-800 bg-slate-800 p-2 shadow-2xl">
          <div
            className="relative overflow-hidden rounded-[2.1rem] bg-white"
            style={{
              filter: `brightness(${0.65 + brightness / 100 * 0.35})`,
            }}
          >
            <div className="flex h-9 items-center justify-between bg-white px-5 text-xs font-bold">
              <span>9:41</span>
              <span>● ● ▰</span>
            </div>

            <div className="flex min-h-[510px] flex-col px-4 pb-4 pt-2">
              <div className="mb-5 flex items-center justify-between">
                <button
                  onClick={() => setActiveApp("Home")}
                  aria-label="Phone home"
                  className="text-sm font-bold text-teal-800"
                >
                  {activeApp === "Home" ? "UPSA LIFE" : "‹ Home"}
                </button>
                <span className="text-xs text-slate-400">
                  {activeApp === "Home" ? "Apps" : activeApp}
                </span>
              </div>

              <div className="flex-1">{renderApp()}</div>

              <div className="mt-5 flex items-center justify-center border-t border-slate-100 pt-3">
                <button
                  onClick={() => setActiveApp("Home")}
                  aria-label="Return to phone home screen"
                  className="h-1.5 w-20 rounded-full bg-slate-800"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mx-auto mt-10 max-w-5xl text-center text-xs text-slate-500">
        UPSA Life · Smartphone prototype · Virtual game features only
      </footer>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-semibold">{value}</span>
    </div>
  );
}
