"use client";

export default function KiboTyping() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 w-fit">
      <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-white"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-white"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}