import { getIcone } from "@/lib/icones";
import { Library, type LucideIcon } from "lucide-react";

const SIZES = {
  sm: { wrapper: "h-9 w-9", icon: "size-4" },
  md: { wrapper: "h-16 w-16", icon: "size-7" },
  lg: { wrapper: "h-24 w-24", icon: "size-10" },
} as const;

/**
 * Badge circulaire rendu à partir d'une clé d'icône (`ICONE_KEYS`).
 * Utilisé pour les bibliothèques comme pour les catégories.
 */
export function IconeBadge({
  icone,
  size = "md",
  fallback = Library,
  className = "",
}: {
  icone: string | null | undefined;
  size?: keyof typeof SIZES;
  /** Icône affichée quand aucune clé valide n'est fournie. */
  fallback?: LucideIcon;
  className?: string;
}) {
  const option = getIcone(icone);
  const { wrapper, icon } = SIZES[size];
  const Icon = option?.Icon ?? fallback;

  return (
    <div
      className={`flex ${wrapper} shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400 ${className}`}
      title={option?.label}
    >
      <Icon className={icon} strokeWidth={1.75} />
    </div>
  );
}
