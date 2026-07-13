export default function Tag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium dark:bg-[#3c3410] text-[#3c3410] dark:text-[#fbbf24] bg-[#fbbf24] text-xs">
      {name}
    </span>
  );
}
