"use client";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full border border-brand-blue/15 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-bronze hover:text-brand-bronze disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-brand-body/35"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
              isActive
                ? "bg-brand-blue text-white"
                : "border border-brand-blue/15 text-brand-blue hover:border-brand-bronze hover:text-brand-bronze"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full border border-brand-blue/15 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-bronze hover:text-brand-bronze disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-brand-body/35"
      >
        Next
      </button>
    </div>
  );
}
