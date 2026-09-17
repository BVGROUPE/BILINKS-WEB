import { ICONE_GROUPS, type IconeKey } from "@/lib/icones";

/**
 * Sélecteur d'icône symbolique, groupé par famille.
 * Partagé par les bibliothèques et les catégories.
 */
export function IconePicker({
  value,
  onChange,
  label = "Icône",
}: {
  value: string | null;
  onChange: (key: IconeKey) => void;
  /** Libellé accessible du groupe de boutons radio. */
  label?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="max-h-[26rem] space-y-5 overflow-y-auto pr-1"
    >
      {ICONE_GROUPS.map((group) => (
        <div key={group.titre}>
          <p className="mb-2 text-theme-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {group.titre}
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {group.options.map(({ key, label: optionLabel, Icon }) => {
              const selected = value === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
                    selected
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500 dark:border-brand-400 dark:bg-brand-500/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      selected
                        ? "bg-brand-100 text-brand-600 dark:bg-brand-500/25 dark:text-brand-300"
                        : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-theme-xs font-medium text-gray-700 dark:text-gray-300">
                    {optionLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
