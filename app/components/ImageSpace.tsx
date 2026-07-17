export default function ImageSpace({ value }: { value: string }) {
  return (
    <div className="w-72 rounded-lg overflow-hidden border border-table-border bg-header">
      <img
        draggable={false}
        src={value}
        alt="Image"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
