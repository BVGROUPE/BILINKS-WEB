import type {
  AdminAuteurApi,
  AdminBookListItemApi,
  AdminCategorieApi,
  AdminCommentListItemApi,
  AdminLibraryApi,
  AdminPaymentListItemApi,
  AdminPlanApi,
  AdminSubscriptionListItemApi,
  AdminBadgeListItemApi,
  AdminChallengeListItemApi,
  AdminUserDetailResponse,
  AdminUserListItemApi,
} from "@/lib/api/admin-types";
import type {
  MockAbonnement,
  MockAuteur,
  MockBadge,
  MockBibliotheque,
  MockCategorie,
  MockCommentaire,
  MockDefi,
  MockLivre,
  MockPaiement,
  MockPlanTarifaire,
  MockUtilisateur,
  TypeDefi,
} from "@/types/admin";

function formatNullableString(value: unknown): string {
  if (value == null || value === "") return "—";
  if (typeof value === "string") return value;
  return "—";
}

export function mapAdminBookToMockLivre(row: AdminBookListItemApi): MockLivre {
  const categories = row.categories ?? [];
  const firstCategory = categories[0]?.nom ?? "—";
  return {
    id: row.id,
    titre: row.titre,
    auteurs:
      row.auteurs?.map((a) => `${a.prenom} ${a.nom}`.trim()).filter(Boolean) ??
      [],
    auteurIds: row.auteurs?.map((a) => a.id) ?? [],
    categorieIds: categories.map((c) => c.id),
    categories,
    categorie: firstCategory,
    langue: formatNullableString(row.langue),
    isbn: row.isbn ?? null,
    type_livre: row.type_livre,
    is_downloadable: row.is_downloadable,
    anneePublication: row.annee_publication ?? 0,
    nombrePages: row.nombre_pages ?? 0,
    statut: row.statut ?? "PUBLIE",
    nbLectures: row.nb_lectures ?? 0,
    noteMoyenne: row.note_moyenne ?? null,
    couvertureUrl: row.couverture_url ?? "",
    resume: row.resume ?? undefined,
    urlExterneLivre: row.url_externe_livre ?? undefined,
    maisonEdition: row.maison_edition ?? null,
  };
}

export function mapAdminPlanToMockPlan(row: AdminPlanApi): MockPlanTarifaire {
  return {
    id: row.id,
    code: row.plan,
    nom: planLabelFromCode(row.plan),
    prix: Number(row.prix),
    dureeJours: row.duree_jours,
    devise: (row.devise as "XAF") ?? "XAF",
    statut: row.statut ?? "ACTIF",
    deletedAt: null,
  };
}

const USER_FIELD_KEYS = {
  telephone: ["numero_telephone", "telephone", "numero", "phone", "phone_number", "tel"],
  ecole: ["ecole", "nom_ecole", "etablissement", "school"],
  niveau: ["niveau", "niveau_etude", "niveau_etudes", "classe", "level"],
  ville: ["ville", "city", "localisation", "adresse_ville"],
} as const;

/** Convertit une valeur API (texte, nombre ou objet `{ nom }`) en texte affichable. */
function toDisplayText(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number") return String(value);
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return toDisplayText(obj.nom ?? obj.libelle ?? obj.name ?? obj.label);
  }
  return null;
}

/**
 * Lit un champ utilisateur où qu'il se trouve (racine, `auth`, `personne`, `profil`) :
 * le backend ne place pas toujours téléphone / école / niveau / ville au même niveau.
 */
function pickUserField(
  sources: unknown[],
  field: keyof typeof USER_FIELD_KEYS
): string {
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    const obj = source as Record<string, unknown>;
    for (const key of USER_FIELD_KEYS[field]) {
      const text = toDisplayText(obj[key]);
      if (text) return text;
    }
  }
  return "—";
}

function userFieldSources(root: object): unknown[] {
  const obj = root as Record<string, unknown>;
  const personne = obj.personne as Record<string, unknown> | undefined;
  return [obj.personne, obj.auth, obj, obj.profil, personne?.profil];
}

export function mapAdminUserToMockUser(row: AdminUserListItemApi): MockUtilisateur {
  const sources = userFieldSources(row);
  return {
    id: row.id,
    nom: row.personne?.nom ?? "—",
    prenom: row.personne?.prenom ?? "—",
    email: row.email,
    ecole: pickUserField(sources, "ecole"),
    niveau: pickUserField(sources, "niveau"),
    telephone: pickUserField(sources, "telephone"),
    ville: pickUserField(sources, "ville"),
    role: row.role,
    statut: row.statut,
    points: row.personne?.points ?? 0,
    dateInscription: (row.date_inscription ?? "").slice(0, 10),
    abonnementActif: Boolean(row.abonnement_actif),
    membreEtablissement: Boolean(row.membre_etablissement),
    deletedAt: null,
  };
}

export function mapAdminUserDetailToMockUser(
  detail: AdminUserDetailResponse
): MockUtilisateur {
  const sources = userFieldSources(detail);
  const aboActif = (detail.abonnements ?? []).some((a) => a.statut === "ACTIF");
  return {
    id: detail.auth.id,
    nom: detail.personne.nom,
    prenom: detail.personne.prenom,
    email: detail.auth.email,
    ecole: pickUserField(sources, "ecole"),
    niveau: pickUserField(sources, "niveau"),
    telephone: pickUserField(sources, "telephone"),
    ville: pickUserField(sources, "ville"),
    role: detail.auth.role,
    statut: detail.auth.statut,
    points: detail.personne.points ?? 0,
    dateInscription: (detail.auth.date_inscription ?? "").slice(0, 10),
    abonnementActif: aboActif,
    membreEtablissement: Boolean(detail.membre_etablissement),
    deletedAt: detail.personne.deleted_at ? String(detail.personne.deleted_at) : null,
  };
}

export function mapAdminCommentToMock(
  row: AdminCommentListItemApi
): MockCommentaire {
  const nom = `${row.auteur.prenom} ${row.auteur.nom}`.trim();
  return {
    id: row.id,
    utilisateurNom: nom || row.auteur.email,
    livreTitre: row.livre.titre,
    contenu: row.contenu,
    statut: row.statut,
    createdAt: row.createdAt,
  };
}

export function mapAdminPaymentToMock(row: AdminPaymentListItemApi): MockPaiement {
  const op =
    typeof row.operateur === "string"
      ? row.operateur
      : row.operateur != null
        ? String(row.operateur)
        : "—";
  return {
    id: row.id,
    utilisateurNom: row.auth.email,
    plan: row.plan.plan,
    montant: Number(row.montant),
    operateur: op,
    numeroTelephone: "—",
    statut: row.statut,
    refTransaction: row.ref_transaction || null,
    createdAt: row.createdAt,
  };
}

export function mapAdminSubscriptionToMockAbonnement(
  row: AdminSubscriptionListItemApi
): MockAbonnement {
  return {
    id: row.id,
    utilisateurNom: `${row.auth.personne.prenom} ${row.auth.personne.nom}`.trim(),
    utilisateurEmail: row.auth.email,
    plan: row.plan.plan,
    typeRenouvellement: row.type_renouvellement,
    statut: row.statut,
    dateDebut: row.date_debut.slice(0, 10),
    dateFin: row.date_fin.slice(0, 10),
    montant: Number(row.plan.prix),
    deletedAt: null,
  };
}

function planLabelFromCode(code: string): string {
  const labels: Record<string, string> = {
    HEBDOMADAIRE: "Hebdomadaire",
    MENSUEL: "Mensuel",
    ANNUEL: "Annuel",
  };
  return labels[code] ?? code;
}

function apiOptionalString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value == null) return "";
  return String(value).trim();
}

export function mapAdminAuteurToMock(row: AdminAuteurApi): MockAuteur {
  return {
    id: row.id,
    nom: row.nom?.trim() ?? "",
    prenom: apiOptionalString(row.prenom),
    bio: apiOptionalString(row.bio),
    nbLivres: row.nb_livres ?? 0,
    deletedAt: null,
  };
}

export function mapAdminLibraryToMock(row: AdminLibraryApi): MockBibliotheque {
  const desc =
    typeof row.description === "string"
      ? row.description
      : row.description != null
        ? String(row.description)
        : "";
  let url: string | null = null;
  if (typeof row.url_externe === "string") {
    url = row.url_externe.trim() || null;
  } else if (
    row.url_externe != null &&
    typeof row.url_externe === "object" &&
    Object.keys(row.url_externe).length > 0
  ) {
    url = JSON.stringify(row.url_externe);
  }
  return {
    id: row.id,
    nom: row.nom,
    type: row.type,
    statut: row.statut,
    description: desc || "—",
    urlExterne: url,
    couvertureUrl: row.couverture_url ?? null,
    icone: row.icone ?? null,
    nbLivres: row.nb_livres ?? 0,
    deletedAt: null,
  };
}

export function mapAdminChallengeToMock(
  row: AdminChallengeListItemApi
): MockDefi {
  return {
    id: row.id,
    titre: row.titre,
    description: "",
    objectif: `${row.objectif_valeur} (${row.type})`,
    objectifValeur: row.objectif_valeur,
    type: row.type as TypeDefi,
    badgeNom: row.badge?.nom,
    pointsRecompense: row.points_bonus ?? 0,
    dateDebut: row.date_debut.slice(0, 10),
    dateFin: row.date_fin.slice(0, 10),
    statut:
      row.statut === "ACTIF" ||
      row.statut === "TERMINE" ||
      row.statut === "ANNULE"
        ? row.statut
        : "ACTIF",
    participants: row.nb_participants ?? 0,
    deletedAt: null,
  };
}

function formatBadgeDescription(
  value: AdminBadgeListItemApi["description"]
): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "object" && Object.keys(value).length === 0) return "";
  return JSON.stringify(value);
}

export function mapAdminBadgeToMock(row: AdminBadgeListItemApi): MockBadge {
  const desc = formatBadgeDescription(row.description);
  return {
    id: row.id,
    nom: row.nom,
    description: desc || "—",
    condition: "—",
    rarete: "COMMUN",
    nbAttribues: row.nb_utilisateurs ?? 0,
    actif: true,
    icone: row.icone,
    couleur: row.couleur,
    points: row.points,
    deletedAt: null,
  };
}

export function mapAdminCategorieToMock(
  row: AdminCategorieApi
): MockCategorie {
  const desc =
    typeof row.description === "string"
      ? row.description
      : row.description != null
        ? String(row.description)
        : "";
  return {
    id: row.id,
    nom: row.nom,
    description: desc,
    icone: row.icone ?? null,
    nbLivres: row.nb_livres ?? 0,
    deletedAt: null,
  };
}
