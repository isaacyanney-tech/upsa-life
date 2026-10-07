export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
        U
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          UPSA LIFE
        </h1>

        <p className="text-xs text-gray-500">
          Your university. Your choices. Your life.
        </p>
      </div>
    </div>
  );
}