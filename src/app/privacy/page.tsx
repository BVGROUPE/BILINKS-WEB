import type { Metadata } from "next";
import {
  LegalCallout,
  LegalCard,
  LegalList,
  LegalShell,
  LegalSignature,
  LegalTable,
  type LegalSection,
} from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  // `absolute` neutralise le template racine (« … — B LINKS Admin ») : cette
  // page est publique et référencée dans les fiches Google Play / App Store.
  title: { absolute: "Politique de confidentialité — BI LINKS" },
  description:
    "Comment BI LINKS collecte, utilise, partage et protège les données personnelles des utilisateurs de l’application mobile et du site web.",
};

const DATA_TABLE: { category: string; examples: string; collected: string }[] = [
  {
    category: "Informations d’identification",
    examples: "Nom, adresse e-mail, mot de passe (chiffré), photo de profil",
    collected: "Oui",
  },
  {
    category: "Données de compte",
    examples:
      "Identifiant utilisateur, préférences de lecture, historique de lecture, favoris, abonnements",
    collected: "Oui",
  },
  {
    category: "Données de paiement",
    examples:
      "Statut et historique d’abonnement, opérateur Mobile Money utilisé (MTN / Airtel), référence de transaction",
    collected:
      "Oui — le paiement est initié uniquement sur le site web BI LINKS. L’application mobile affiche ce statut et cet historique en lecture seule. Ni le numéro de compte Mobile Money ni les données bancaires ne sont stockés par BI LINKS (voir Article 6).",
  },
  {
    category: "Données techniques et d’appareil",
    examples:
      "Type d’appareil, système d’exploitation, identifiant d’appareil (jeton de notification push), adresse IP, journaux d’erreurs",
    collected: "Oui",
  },
  {
    category: "Données d’usage",
    examples:
      "Pages consultées, contenus consultés (y compris via l’intégration YouTube), durée de session, statistiques d’utilisation",
    collected: "Oui",
  },
  {
    category: "Localisation approximative",
    examples:
      "Pays ou région déduite de l’adresse IP ou de l’opérateur Mobile Money, à des fins de facturation et de conformité",
    collected: "Oui — localisation approximative uniquement, aucune géolocalisation précise",
  },
];

const SECTIONS: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    body: (
      <>
        <p>
          Le responsable du traitement des données personnelles collectées via l’Application est :
        </p>
        <LegalCard>
          <p className="font-semibold text-gray-900 dark:text-white">BI LINKS</p>
          <p className="mt-1 text-sm">Représenté par : Blanche Igogne Rose</p>
          <p className="mt-1 text-sm">
            Adresse : 8, Avenue des Trois Martyrs, Brazzaville, République du Congo
          </p>
          <p className="mt-1 text-sm">
            E-mail :{" "}
            <a
              href="mailto:bvgroupe25@gmail.com"
              className="font-medium text-brand-500 underline underline-offset-4 dark:text-brand-300"
            >
              bvgroupe25@gmail.com
            </a>
          </p>
        </LegalCard>
      </>
    ),
  },
  {
    id: "donnees-collectees",
    title: "Données collectées",
    body: (
      <>
        <p>
          Selon votre usage de l’Application, nous pouvons collecter les catégories de données
          suivantes :
        </p>
        <LegalTable
          headers={["Catégorie", "Exemples de données", "Collectée"]}
          rows={DATA_TABLE.map((row) => [row.category, row.examples, row.collected])}
        />
        <LegalCallout>
          Nous ne collectons volontairement aucune donnée sensible : santé, origine ethnique,
          opinions religieuses ou politiques, orientation sexuelle, données biométriques.
        </LegalCallout>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités de la collecte",
    body: (
      <>
        <p>Les données personnelles collectées sont utilisées pour :</p>
        <LegalList
          items={[
            "Créer et gérer le compte utilisateur ;",
            "Fournir l’accès aux contenus de lecture et personnaliser l’expérience (recommandations, historique, favoris) ;",
            "Traiter les abonnements et paiements via Mobile Money (MTN Mobile Money, Airtel Money), exclusivement sur le site web BI LINKS, et afficher dans l’application mobile le statut et l’historique de ces abonnements ;",
            "Assurer le support technique et répondre aux demandes des utilisateurs ;",
            "Améliorer la sécurité, prévenir la fraude et détecter les usages abusifs ;",
            "Analyser l’utilisation de l’Application afin d’améliorer nos services, au moyen de statistiques agrégées et anonymisées ;",
            "Respecter nos obligations légales et réglementaires.",
          ]}
        />
      </>
    ),
  },
  {
    id: "base-legale",
    title: "Base légale du traitement",
    body: (
      <>
        <p>Le traitement de vos données repose, selon les cas, sur :</p>
        <LegalList
          items={[
            "L’exécution du contrat d’utilisation de l’Application (création de compte, gestion de l’abonnement) ;",
            "Votre consentement explicite, par exemple pour les communications marketing ou certains cookies ;",
            "Notre intérêt légitime à sécuriser et améliorer le service ;",
            "Le respect d’obligations légales applicables.",
          ]}
        />
      </>
    ),
  },
  {
    id: "partage",
    title: "Partage des données avec des tiers",
    body: (
      <>
        <p>
          BI LINKS ne vend pas les données personnelles des utilisateurs. Certaines données peuvent
          être partagées avec des prestataires techniques strictement nécessaires au fonctionnement
          de l’Application, dans le respect de la présente politique :
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Hébergement et base de données
              </strong>{" "}
              : Supabase (authentification, stockage des données applicatives) ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Stockage média
              </strong>{" "}
              : Cloudinary (hébergement des images et couvertures) ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Stockage des fichiers de lecture
              </strong>{" "}
              : Cloudflare R2 (hébergement des fichiers d’ouvrages) ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Paiement et facturation
              </strong>{" "}
              : PawaPay (agrégateur Mobile Money) ainsi que les opérateurs MTN Congo et Airtel
              Congo. Ce traitement a lieu exclusivement via le site web BI LINKS ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Contenus tiers
              </strong>{" "}
              : API YouTube pour l’affichage de certaines vidéos éducatives, soumis aux conditions
              de Google et YouTube ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </strong>{" "}
              : services de notification push d’Expo, Google (FCM) et Apple (APNs) ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Autorités compétentes
              </strong>{" "}
              : en cas d’obligation légale, de réquisition judiciaire ou de protection de nos
              droits.
            </>,
          ]}
        />
        <p>
          Ces prestataires n’ont accès qu’aux données strictement nécessaires à l’exécution de leur
          prestation et sont tenus à des obligations de confidentialité et de sécurité.
        </p>
        <LegalCallout>
          Les ouvrages au format PDF et EPUB sont affichés localement sur votre appareil, par le
          moteur de rendu intégré à l’Application. Le contenu des fichiers que vous lisez n’est
          transmis à aucun service tiers d’affichage de documents.
        </LegalCallout>
      </>
    ),
  },
  {
    id: "paiement",
    title: "Données de paiement et Mobile Money",
    body: (
      <>
        <LegalCallout>
          Aucun paiement n’est initié ni traité dans l’application mobile BI LINKS. La souscription
          à un abonnement s’effectue exclusivement sur le site web BI LINKS.
        </LegalCallout>
        <p>
          Lorsque vous souscrivez via MTN Mobile Money ou Airtel Money, la transaction est traitée
          directement par l’opérateur de paiement mobile et par notre prestataire d’agrégation
          (PawaPay). BI LINKS ne stocke ni votre code secret, ni les identifiants complets de votre
          compte Mobile Money. Nous conservons uniquement les informations nécessaires au suivi de
          l’abonnement : statut, date, référence de transaction et opérateur utilisé.
        </p>
        <p>
          L’application mobile se limite à afficher, en lecture seule, le statut de votre
          abonnement et l’historique de vos transactions, à partir des informations enregistrées
          par nos serveurs à la suite d’un paiement effectué sur le site web.
        </p>
      </>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    body: (
      <p>
        Les données personnelles sont conservées pendant toute la durée d’utilisation active du
        compte, puis archivées ou supprimées dans un délai de douze (12) mois après la suppression
        du compte ou la dernière activité, sauf obligation légale de conservation plus longue,
        notamment en matière comptable et fiscale.
      </p>
    ),
  },
  {
    id: "securite",
    title: "Sécurité des données",
    body: (
      <>
        <p>
          BI LINKS met en œuvre des mesures techniques et organisationnelles raisonnables pour
          protéger les données personnelles contre l’accès non autorisé, la perte, l’altération ou
          la divulgation, notamment :
        </p>
        <LegalList
          items={[
            "Chiffrement des mots de passe ;",
            "Connexions sécurisées (HTTPS/TLS) entre l’Application et nos serveurs ;",
            "Contrôle d’accès restreint aux données sur nos systèmes ;",
            "Sauvegardes régulières et surveillance des accès.",
          ]}
        />
        <p>
          Aucun système n’étant totalement infaillible, nous ne pouvons garantir une sécurité
          absolue, mais nous nous engageons à réagir rapidement en cas d’incident de sécurité
          affectant vos données.
        </p>
      </>
    ),
  },
  {
    id: "droits",
    title: "Droits de l’utilisateur",
    body: (
      <>
        <p>
          Vous disposez, sous réserve de la réglementation applicable, des droits suivants
          concernant vos données personnelles :
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">Droit d’accès</strong>{" "}
              : obtenir une copie des données que nous détenons sur vous ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Droit de rectification
              </strong>{" "}
              : corriger des données inexactes ou incomplètes ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Droit de suppression
              </strong>{" "}
              : demander la suppression de votre compte et des données associées ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Droit d’opposition
              </strong>{" "}
              : vous opposer à certains traitements, par exemple les communications marketing ;
            </>,
            <>
              <strong className="font-semibold text-gray-900 dark:text-white">
                Droit à la portabilité
              </strong>{" "}
              : recevoir vos données dans un format structuré, dans la mesure du possible.
            </>,
          ]}
        />
        <p>
          Pour exercer ces droits, contactez-nous à l’adresse indiquée à l’Article 15. Nous
          répondrons dans un délai raisonnable, et au plus tard sous 30 jours.
        </p>
      </>
    ),
  },
  {
    id: "transferts",
    title: "Transferts internationaux de données",
    body: (
      <p>
        Certains de nos prestataires techniques (hébergement, stockage média, facturation) peuvent
        traiter des données sur des serveurs situés hors de la République du Congo. Dans ce cas,
        nous veillons à ce que ces prestataires offrent un niveau de protection adéquat, conforme
        aux standards internationaux de sécurité et de confidentialité.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies et technologies similaires",
    body: (
      <p>
        Le site web et l’Application peuvent utiliser des cookies ou technologies équivalentes
        (stockage local) afin d’assurer le fonctionnement du service, de mémoriser vos préférences
        et de mesurer l’audience de manière agrégée. Vous pouvez gérer ou désactiver ces éléments
        via les paramètres de votre navigateur ou de votre appareil, étant précisé que cela peut
        limiter certaines fonctionnalités.
      </p>
    ),
  },
  {
    id: "mineurs",
    title: "Protection des mineurs",
    body: (
      <p>
        L’Application n’est pas destinée aux enfants de moins de 16 ans sans le consentement d’un
        parent ou tuteur légal. BI LINKS ne collecte pas sciemment de données personnelles auprès
        d’enfants sans une telle autorisation. Si vous pensez qu’un enfant a fourni des données
        personnelles sans consentement approprié, veuillez nous contacter afin que nous puissions
        procéder à leur suppression.
      </p>
    ),
  },
  {
    id: "suppression",
    title: "Suppression du compte et des données",
    body: (
      <>
        <p>
          Vous pouvez supprimer votre compte directement depuis l’Application, dans{" "}
          <strong className="font-semibold text-gray-900 dark:text-white">
            Profil → Paramètres → « Supprimer mon compte »
          </strong>
          . Vos données personnelles (nom, e-mail, photo, téléphone) sont alors anonymisées
          immédiatement et votre compte est désactivé. Vous pouvez également faire cette demande
          par e-mail à l’adresse indiquée à l’Article 15.
        </p>
        <p>
          Les données liées à vos abonnements et paiements sont conservées au-delà de la
          suppression du compte, conformément à nos obligations légales de conservation comptable
          (voir Article 7).
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modifications de la présente politique",
    body: (
      <p>
        BI LINKS peut modifier la présente Politique de confidentialité à tout moment, notamment
        pour refléter des évolutions légales, techniques ou fonctionnelles de l’Application. Toute
        modification substantielle sera portée à la connaissance des utilisateurs via l’Application
        ou par e-mail. La date de dernière mise à jour figure en haut de ce document.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>
          Pour toute question relative à la présente Politique de confidentialité ou à l’exercice
          de vos droits, vous pouvez nous contacter :
        </p>
        <LegalCard>
          <p>
            E-mail :{" "}
            <a
              href="mailto:bvgroupe25@gmail.com"
              className="font-medium text-brand-500 underline underline-offset-4 dark:text-brand-300"
            >
              bvgroupe25@gmail.com
            </a>
          </p>
          <p className="mt-1">
            Adresse postale : 8, Avenue des Trois Martyrs, Brazzaville, République du Congo
          </p>
        </LegalCard>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalShell
      documentTitle="Politique de confidentialité"
      eyebrow="Document légal"
      subtitle="Version applicable à l’application mobile et au site web BI LINKS."
      reference="BI LINKS-PC-2026-01"
      effectiveDate="12 août 2026"
      intro={
        <>
          <p>
            La présente Politique de confidentialité décrit la manière dont BI LINKS (« nous », «
            notre », « l’Application ») collecte, utilise, partage et protège les données à
            caractère personnel des utilisateurs (« vous », « l’Utilisateur ») de l’application
            mobile et du site web BI LINKS, plateforme numérique de lecture disponible en
            République du Congo et dans d’autres pays.
          </p>
          <p className="mt-4">
            Cette politique est rédigée conformément aux exigences de la fiche Google Play —
            Sécurité des données (Data Safety) et aux principes généraux de protection des données
            personnelles.
          </p>
        </>
      }
      sections={SECTIONS}
      footer={
        <LegalSignature
          place="Brazzaville"
          date="12 août 2026"
          name="Blanche Igogne Rose"
          role="Directrice Générale"
        />
      }
    />
  );
}
