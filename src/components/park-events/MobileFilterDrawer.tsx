import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import type { FilterSidebarProps } from "./FilterSidebar";

interface MobileFilterDrawerProps extends FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDrawer({ isOpen, onClose, ...sidebarProps }: MobileFilterDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--ff-cream)] z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
          <span className="font-semibold text-[var(--ff-green)]">Filters & Sort</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-[var(--ff-gray)]"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar {...sidebarProps} />
        </div>
      </div>
    </>
  );
}
