export function DecorativeWaves() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 overflow-visible lg:block"
      aria-hidden
    >
      <aside className="absolute -right-32 top-0 bottom-0 w-28 overflow-hidden xl:w-36">
        <svg viewBox="0 0 140 500" className="h-full w-full" fill="none">
          <path
            d="M90 0 C50 100 110 200 70 300 S30 420 90 500"
            stroke="#4aa4de"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.28"
          />
          <path
            d="M110 30 C70 130 130 230 90 330 S50 450 110 500"
            stroke="#fcd116"
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      </aside>
    </div>
  );
}
