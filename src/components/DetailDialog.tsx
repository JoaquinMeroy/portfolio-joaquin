import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export interface Detail {
  title: string;
  subtitle?: string;
  wide?: boolean;
  body: ReactNode;
}

/** Native <dialog>: focus trap, Esc to close and inert background come from the browser. */
export function DetailDialog({
  detail,
  onClose,
}: {
  detail: Detail | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (detail && !d.open) d.showModal();
    if (!detail && d.open) d.close();
  }, [detail]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="detail-title"
      className={`detail m-auto ${detail?.wide ? "w-[min(60rem,calc(100vw-2rem))]" : "w-[min(42rem,calc(100vw-2rem))]"} max-h-[85vh] overflow-y-auto rounded-2xl border border-navy-700 bg-navy-900 p-0 text-ink backdrop:bg-navy-950/80 backdrop:backdrop-blur-sm`}
    >
      {detail && (
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id="detail-title" className="font-display text-2xl">
                {detail.title}
              </h2>
              {detail.subtitle && (
                <p className="mt-1 text-sm text-muted">{detail.subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-muted hover:bg-navy-800 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          {detail.body}
        </div>
      )}
    </dialog>
  );
}
