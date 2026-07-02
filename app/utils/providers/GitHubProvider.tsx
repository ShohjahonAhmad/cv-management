import GitHubIcon from "../GitHubIcon";
import Gmail from "../Gmail";

export default function GitHubProvider() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium dark:bg-[#1f1f27] bg-[#f0f0f0] text-[#24292e] dark:text-[#a5b4fc] text-xs">
      <GitHubIcon />
      GitHub
    </span>
  );
}
