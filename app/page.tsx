import Logo from "@/components/Logo";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <Logo />

        <button className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
          Sign In
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-8 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Welcome to UPSA
          </p>

          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Live your
            <br />
            <span className="text-gray-500">UPSA Life.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Create your student, attend classes, build your career, make money,
            meet people and experience university life your way.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-black px-7 py-3.5 font-medium text-white transition hover:bg-gray-800">
              Start Your Life
            </button>

            <button className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-medium transition hover:bg-gray-100">
              Explore UPSA
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-white px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Your Journey
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              University life is in your hands.
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Feature
              icon="🎓"
              title="Build Your Academic Life"
              description="Attend lectures, study, complete courses and work towards graduation."
            />

            <Feature
              icon="💰"
              title="Make Your Money"
              description="Find jobs, earn virtual Ghana cedis and manage your student economy."
            />

            <Feature
              icon="👥"
              title="Live Socially"
              description="Meet other students, make friends, join clubs and create memories."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-8 py-8 text-center text-sm text-gray-500">
        © 2026 UPSA Life. A student-life simulation project.
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-5 text-3xl">{icon}</div>

      <h4 className="text-lg font-semibold">{title}</h4>

      <p className="mt-2 leading-7 text-gray-600">{description}</p>
    </div>
  );
}