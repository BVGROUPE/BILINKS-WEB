import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalCard,
  LegalList,
  LegalShell,
  LegalSignature,
  type LegalSection,
} from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  // `absolute` neutralise le template racine (« … — B LINKS Admin »).
  title: { absolute: "Conditions d’utilisation — BI LINKS" },
  description:
    "Conditions générales d’utilisation de l’application mobile et du site web BI LINKS.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "objet",
    title: "Objet",
    body: (
      <p>
        BI LINKS est une plateforme numérique de lecture donnant accès à un catalogue d’ouvrages.
        Les présentes conditions encadrent l’utilisation de l’application mobile, du site web et
        des comptes utilisateurs. En créant un compte ou en utilisant le service, vous les
        acceptez sans réserve.
      </p>
    ),
  },
  {
    id: "compte",
    title: "Votre compte",
    body: (
      <>
        <p>
          La création d’un compte requiert des informations exactes et à jour. Vous êtes
          responsable de la confidentialité de vos identifiants et de toute activité effectuée
          depuis votre compte.
        </p>
        <LegalList
          items={[
            "Un compte est strictement personnel et ne peut être partagé ni cédé ;",
            "Vous devez avoir au moins 16 ans, ou disposer de l’autorisation d’un parent ou tuteur légal ;",
            "Vous pouvez supprimer votre compte à tout moment depuis Profil → Paramètres → « Supprimer mon compte ».",
          ]}
        />
      </>
    ),
  },
  {
    id: "acces",
    title: "Accès aux contenus",
    body: (
      <>
        <p>
          Certains ouvrages sont accessibles librement, d’autres nécessitent un compte disposant
          d’un abonnement actif. L’état de votre compte détermine les contenus disponibles.
        </p>
        <p>
          La souscription et la gestion des abonnements s’effectuent sur le site web BI LINKS. Dès
          que votre compte est mis à jour, l’accès aux contenus s’active automatiquement dans
          l’application mobile.
        </p>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: (
      <>
        <p>
          Les ouvrages, textes, images, marques et éléments d’interface proposés sur BI LINKS sont
          protégés par le droit d’auteur et demeurent la propriété de leurs titulaires respectifs.
        </p>
        <p>
          L’accès qui vous est accordé est personnel, non exclusif et non transférable. Sont
          notamment interdites la reproduction, la redistribution, la revente, la location et la
          mise à disposition publique des contenus. Les fichiers téléchargés pour la lecture hors
          connexion restent soumis à ces mêmes règles.
        </p>
      </>
    ),
  },
  {
    id: "conduite",
    title: "Règles de bonne conduite et contenus publiés",
    body: (
      <>
        <p>
          L’Application permet de publier des avis sur les ouvrages. Ces contributions doivent
          rester respectueuses. Sont notamment interdits :
        </p>
        <LegalList
          items={[
            "Les propos haineux, discriminatoires ou injurieux ;",
            "Les contenus sexuels, violents ou choquants ;",
            "Le harcèlement et les attaques personnelles ;",
            "Le spam, la publicité et les contenus frauduleux ;",
            "Toute atteinte aux droits de tiers, notamment au droit d’auteur.",
          ]}
        />
        <p>
          Chaque avis peut être signalé depuis la liste des avis, et vous pouvez bloquer l’auteur
          d’un contenu afin de ne plus voir ses publications. Les signalements sont transmis à
          notre équipe de modération, qui les examine sous 24 heures. Nous pouvons retirer tout
          contenu contraire aux présentes règles et suspendre ou supprimer le compte concerné.
        </p>
      </>
    ),
  },
  {
    id: "disponibilite",
    title: "Disponibilité du service",
    body: (
      <p>
        Nous mettons tout en œuvre pour assurer la continuité du service, sans pouvoir garantir une
        disponibilité permanente ni l’absence d’erreurs. Des interruptions peuvent survenir pour
        maintenance, mise à jour ou pour des raisons indépendantes de notre volonté. Le catalogue
        est évolutif : des ouvrages peuvent y être ajoutés ou en être retirés.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    body: (
      <p>
        BI LINKS ne saurait être tenu responsable des dommages indirects résultant de
        l’utilisation ou de l’impossibilité d’utiliser le service, ni du contenu publié par les
        utilisateurs. Vous demeurez responsable de l’usage que vous faites de l’Application et des
        contenus que vous y publiez.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    body: (
      <p>
        Le traitement de vos données personnelles est décrit dans notre{" "}
        <Link
          href="/privacy"
          className="font-medium text-brand-500 underline underline-offset-4 dark:text-brand-300"
        >
          Politique de confidentialité
        </Link>
        , qui fait partie intégrante des présentes conditions.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modification des conditions",
    body: (
      <p>
        BI LINKS peut modifier les présentes conditions afin de refléter des évolutions légales,
        techniques ou fonctionnelles. Toute modification substantielle sera portée à la
        connaissance des utilisateurs via l’Application ou par e-mail. La poursuite de
        l’utilisation du service vaut acceptation des conditions mises à jour.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "Droit applicable et contact",
    body: (
      <>
        <p>
          Les présentes conditions sont régies par le droit en vigueur en République du Congo. Tout
          différend fera l’objet d’une recherche de solution amiable avant toute action
          contentieuse.
        </p>
        <LegalCard>
          <p className="font-semibold text-gray-900 dark:text-white">BI LINKS</p>
          <p className="mt-1">
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

export default function TermsPage() {
  return (
    <LegalShell
      documentTitle="Conditions d’utilisation"
      eyebrow="Document légal"
      subtitle="Version applicable à l’application mobile et au site web BI LINKS."
      reference="BI LINKS-CGU-2026-01"
      effectiveDate="12 août 2026"
      intro={
        <p>
          Les présentes conditions générales définissent les règles d’accès et d’utilisation de la
          plateforme BI LINKS, éditée par BI LINKS, 8 Avenue des Trois Martyrs, Brazzaville,
          République du Congo. Merci de les lire attentivement avant d’utiliser le service.
        </p>
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
