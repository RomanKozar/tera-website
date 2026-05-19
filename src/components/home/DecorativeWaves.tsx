export function DecorativeWaves() {
  return (
    <aside
      className="pointer-events-none absolute -right-4 top-8 hidden h-[420px] w-32 overflow-hidden lg:block xl:w-40"
      aria-hidden
    >
      <svg viewBox="0 0 120 400" className="h-full w-full" fill="none">
        <path
          d="M80 0 C40 80 100 160 60 240 S20 360 80 400"
          stroke="#4aa4de"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M100 20 C60 100 120 180 80 260 S40 380 100 400"
          stroke="#f2c94c"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </aside>
  );
}
