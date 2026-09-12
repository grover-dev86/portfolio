import { HiBars3 } from "react-icons/hi2";

export default function MobileMenuButton({ onClick, hidden }) {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Abrir menú"
      className="lg:hidden fixed top-4 right-4 z-30 w-11 h-11 rounded-full bg-brand-400 text-white shadow-rail flex items-center justify-center hover:bg-brand-500 transition"
    >
      <HiBars3 className="text-xl" />
    </button>
  );
}
