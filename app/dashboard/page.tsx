import Logo from "@/components/Logo";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <Logo />

        <div className="flex items-center gap-4">
          <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
            🔔
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              I
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Isaac</p>
              <p className="text-xs text-gray-500">Level 300</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-81px)] w-64 border-r bg-white p-5 md:block">
          <nav className="space-y-2">
            <NavItem active icon="🏠" label="Home" />
            <NavItem icon="🎓" label="Academics" />
            <NavItem icon="💰" label="Money" />
            <NavItem icon="💼" label="Jobs" />
            <NavItem icon="🏠" label="Housing" />
            <NavItem icon="👥" label="Social" />
            <NavItem icon="🚌" label="Transport" />
            <NavItem icon="🏆" label="Achievements" />

            <div className="my-5 border-t" />

            <NavItem icon="⚙️" label="Settings" />
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 md:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500">
              Wednesday, October 7, 2026
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Good morning, Isaac 👋
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome back to your UPSA Life.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Money"
              value="₵450"
              icon="💰"
            />

            <StatCard
              label="Energy"
              value="82%"
              icon="⚡"
            />

            <StatCard
              label="Happiness"
              value="76%"
              icon="😊"
            />

            <StatCard
              label="Academic"
              value="3.42"
              icon="🎓"
            />
          </div>

          {/* Content Cards */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Today's Schedule */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today</p>
                  <h2 className="mt-1 text-xl font-bold">
                    Your Schedule
                  </h2>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                  3 events
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <ScheduleItem
                  time="8:00 AM"
                  title="Database Systems"
                  location="Academic City"
                />

                <ScheduleItem
                  time="10:00 AM"
                  title="Research Methods"
                  location="Lecture Theatre 2"
                />

                <ScheduleItem
                  time="2:00 PM"
                  title="Free Time"
                  location="UPSA Campus"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">Quick Actions</p>

              <h2 className="mt-1 text-xl font-bold">
                What do you want to do?
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <ActionButton icon="📚" label="Study" />
                <ActionButton icon="💼" label="Find a Job" />
                <ActionButton icon="🍛" label="Get Food" />
                <ActionButton icon="👥" label="Socialize" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-xl">{icon}</span>
      </div>

      <p className="mt-4 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ScheduleItem({
  time,
  title,
  location,
}: {
  time: string;
  title: string;
  location: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
      <div className="w-20 shrink-0 text-sm font-semibold">
        {time}
      </div>

      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <button className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:bg-gray-100">
      <div className="text-2xl">{icon}</div>
      <p className="mt-2 text-sm font-semibold">{label}</p>
    </button>
  );
}