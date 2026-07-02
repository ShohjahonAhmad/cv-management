import Gmail from "../Gmail";

export default function GoogleProvider() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium dark:bg-[#2d1a1a] bg-[#fff1f0] text-[#e53e3e] dark:text-[#f87171] text-xs">
      <Gmail />
      Google
    </span>
  );
}
