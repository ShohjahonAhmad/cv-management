import { useDarkMode } from "~/context/DarkModeProvider";
import Mode from "~/utils/Mode";

export default function ModeButton() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <button
      className="p-2 dark:bg-[#0f172a]/50 dark:hover:bg-[#0f172a]/40 bg-[#FEFFFF]/10 hover:bg-[#FEFFFF]/20 rounded-full transition-all duration-200 cursor-pointer hover:scale-110"
      onClick={() => setIsDark(!isDark)}
    >
      <Mode stroke={isDark ? "#94A3B8" : "#64748B"} />
    </button>
  );
}
