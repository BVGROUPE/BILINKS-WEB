import {
  Atom,
  Baby,
  Briefcase,
  Building2,
  BookMarked,
  BookOpen,
  Code2,
  GraduationCap,
  Gavel,
  Landmark,
  Languages,
  LayoutGrid,
  Library,
  Microscope,
  Music,
  Newspaper,
  Paintbrush,
  Palette,
  Plane,
  Presentation,
  School,
  School2,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Trophy,
  University,
  Wheat,
  type LucideIcon,
} from "lucide-react";

/**
 * Clés d'icônes symboliques partagées par `bibliotheque.icone` et
 * `categorie.icone`. Doit rester synchronisé avec le backend
 * (BILINKS-BACKEND/src/common/icone.constants.ts) et le mobile
 * (BILINKS-MOBILE/constants/iconeMap.ts).
 */
export const ICONE_KEYS = [
  "ecole",
  "college",
  "lycee",
  "universite",
  "recherche",
  "formation",
  "bibliotheque",
  "litterature",
  "sciences",
  "histoire",
  "langues",
  "droit",
  "technologie",
  "education",
  "entrepreneuriat",
  "marketing",
  "finance",
  "leadership",
  "sante",
  "agriculture",
  "jeunesse",
  "art",
  "musique",
  "sport",
  "spiritualite",
  "voyage",
  "actualites",
  "general",
] as const;

export type IconeKey = (typeof ICONE_KEYS)[number];

export type IconeOption = {
  key: IconeKey;
  label: string;
  Icon: LucideIcon;
};

export type IconeGroup = {
  titre: string;
  options: IconeOption[];
};

/** Groupé pour l'affichage dans IconPicker — l'ordre des groupes est intentionnel. */
export const ICONE_GROUPS: IconeGroup[] = [
  {
    titre: "Espaces & niveaux scolaires",
    options: [
      { key: "ecole", label: "École", Icon: School },
      { key: "college", label: "Collège", Icon: School2 },
      { key: "lycee", label: "Lycée", Icon: Presentation },
      { key: "universite", label: "Université", Icon: University },
      { key: "recherche", label: "Recherche", Icon: Microscope },
      { key: "formation", label: "Formation pro", Icon: Briefcase },
      { key: "bibliotheque", label: "Bibliothèque", Icon: Library },
    ],
  },
  {
    titre: "Domaines académiques",
    options: [
      { key: "litterature", label: "Littérature", Icon: BookMarked },
      { key: "sciences", label: "Sciences", Icon: Atom },
      { key: "histoire", label: "Histoire", Icon: Landmark },
      { key: "langues", label: "Langues", Icon: Languages },
      { key: "droit", label: "Droit", Icon: Gavel },
      { key: "technologie", label: "Technologie", Icon: Code2 },
      { key: "education", label: "Éducation", Icon: GraduationCap },
    ],
  },
  {
    titre: "Métiers & société",
    options: [
      { key: "entrepreneuriat", label: "Entrepreneuriat", Icon: TrendingUp },
      { key: "marketing", label: "Marketing", Icon: Palette },
      { key: "finance", label: "Finance", Icon: Building2 },
      { key: "leadership", label: "Leadership", Icon: BookOpen },
      { key: "sante", label: "Santé", Icon: Stethoscope },
      { key: "agriculture", label: "Agriculture", Icon: Wheat },
      { key: "jeunesse", label: "Jeunesse", Icon: Baby },
    ],
  },
  {
    titre: "Culture & vie pratique",
    options: [
      { key: "art", label: "Art", Icon: Paintbrush },
      { key: "musique", label: "Musique", Icon: Music },
      { key: "sport", label: "Sport", Icon: Trophy },
      { key: "spiritualite", label: "Spiritualité", Icon: Sparkles },
      { key: "voyage", label: "Voyage", Icon: Plane },
      { key: "actualites", label: "Actualités", Icon: Newspaper },
      { key: "general", label: "Général", Icon: LayoutGrid },
    ],
  },
];

export const ICONES: IconeOption[] =
  ICONE_GROUPS.flatMap((g) => g.options);

const ICONES_BY_KEY = new Map(
  ICONES.map((option) => [option.key, option])
);

export function getIcone(
  key: string | null | undefined
): IconeOption | null {
  if (!key) return null;
  return ICONES_BY_KEY.get(key as IconeKey) ?? null;
}
