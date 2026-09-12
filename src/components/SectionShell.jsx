/**
 * Shared wrapper to give every section consistent padding,
 * scrolling and a subtle fade-up animation on mount.
 */
export default function SectionShell({ children, className = "" }) {
  return (
    <div
      className={[
        "h-full w-full overflow-y-auto",
        "px-6 sm:px-10 lg:px-14 py-10 lg:py-14",
        "animate-fade-up",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
