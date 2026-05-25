export function AccentWave({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 420"
      className={`pointer-events-none absolute hidden h-[520px] w-36 opacity-80 lg:block ${className}`}
    >
      <path
        d="M72 18C42 92 81 153 57 230C38 290 16 332 73 402"
        fill="none"
        stroke="#bfe3f5"
        strokeLinecap="round"
        strokeWidth="28"
      />
      <path
        d="M95 48C62 125 92 191 76 265C61 333 47 363 98 404"
        fill="none"
        stroke="#f9e783"
        strokeLinecap="round"
        strokeWidth="24"
      />
    </svg>
  );
}
