export default function PositionLevel({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium dark:bg-[#0d2218] text-[#1a4030] dark:text-[#4ade80] bg-[#4ade80] text-xs"
      //   border: 1px solid ;
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10px"
        height="10px"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4.8"
        >
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          <rect width="20" height="14" x="2" y="6" rx="2"></rect>
        </g>
      </svg>
      {count}
    </span>
  );
}
