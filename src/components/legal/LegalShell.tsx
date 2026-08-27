import type { ReactNode } from "react";
import Image from "next/image";
import { Outfit, Source_Serif_4 } from "next/font/google";

import { LegalToc } from "./LegalToc";

/** Serif de lecture : distingue le document légal de l'interface d'administration. */
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-legal-serif",
  display: "swap",
});

/** Sans de labeur : réutilisée pour les éléments tabulaires et les libellés. */
const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-legal-sans",
  display: "swap",
});

const SERIF = "font-[family-name:var(--font-legal-serif)]";
const SANS = "font-[family-name:var(--font-legal-sans)]";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type Props = {
  documentTitle: string;
  eyebrow: string;
  subtitle: string;
  reference: string;
  effectiveDate: string;
  intro: ReactNode;
  sections: LegalSection[];
  footer?: ReactNode;
};

/**
 * Gabarit des documents légaux publics (politique de confidentialité, CGU).
 *
 * Deux règles structurent cette page :
 * — elle reste accessible sans authentification (son URL est déclarée dans les
 *   fiches Google Play et App Store) ;
 * — elle est terminale : aucun lien vers l'accueil ni vers un parcours d'achat,
 *   la racine du site redirigeant vers /subscribe.
 */
export function LegalShell({
  documentTitle,
  eyebrow,
  subtitle,
  reference,
  effectiveDate,
  intro,
  sections,
  footer,
}: Props) {
  const tocItems = sections.map(({ id, title }) => ({ id, title }));

  return (
    <main
      className={`${serif.variable} ${sans.variable} min-h-screen bg-[#f6f8fb] text-gray-700 dark:bg-brand-950 dark:text-gray-300`}
    >
      {/* ── En-tête gravé ───────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-brand-900 dark:bg-[#071526]">
        {/* Trame gravée façon papier officiel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 9px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-400/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/bibliotech-logo.png"
              alt="BI LINKS"
              width={36}
              height={36}
              className="rounded-lg ring-1 ring-white/20"
            />
            <span className="text-sm font-semibold tracking-[0.24em] text-white">
              BI LINKS
            </span>
          </div>

          <p className="mt-14 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-amber-300">
            {eyebrow}
          </p>
          <h1
            className={`${SERIF} mt-4 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[3.25rem]`}
          >
            {documentTitle}
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-brand-100/85">
            {subtitle}
          </p>

          {/* Cartouche d'identification du document */}
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-brand-200/70">
                Référence
              </dt>
              <dd className="mt-2 text-sm font-semibold tabular-nums text-white">{reference}</dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-brand-200/70">
                Entrée en vigueur
              </dt>
              <dd className="mt-2 text-sm font-semibold text-white">{effectiveDate}</dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-brand-200/70">
                Articles
              </dt>
              <dd className="mt-2 text-sm font-semibold tabular-nums text-white">
                {sections.length}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          {/* Sommaire suiveur + jauge de lecture (seul bloc interactif). */}
          <LegalToc items={tocItems} />

          <article className="min-w-0">
            {/* Chapô, avec lettrine */}
            <div
              className={`${SERIF} max-w-[64ch] text-[1.0625rem] leading-[1.7] sm:text-[1.1875rem] text-gray-700 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:text-[3.25rem] [&>p:first-of-type]:first-letter:font-semibold [&>p:first-of-type]:first-letter:leading-[0.85] [&>p:first-of-type]:first-letter:text-brand-800 dark:text-gray-300 dark:[&>p:first-of-type]:first-letter:text-amber-300`}
            >
              {intro}
            </div>

            {/* Sommaire replié (mobile) */}
            <nav
              aria-label="Sommaire"
              className="mt-12 border-y border-gray-200 py-6 lg:hidden dark:border-white/10"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Sommaire
              </p>
              <ol className="mt-4 space-y-2.5">
                {sections.map((section, index) => (
                  <li key={section.id} className="flex gap-3 text-sm">
                    <span className="w-5 shrink-0 text-right tabular-nums text-amber-500/80">
                      {index + 1}
                    </span>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-4">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-16 border-t border-gray-200/90 py-12 first:border-t-0 sm:py-14 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-6 dark:border-white/[0.08]"
                >
                  {/* Numéro d'article en marge : les articles sont cités par leur rang. */}
                  <div
                    aria-hidden="true"
                    className={`${SERIF} hidden pt-1 text-right text-[1.75rem] font-semibold leading-none tabular-nums text-amber-500/45 lg:block dark:text-amber-300/40`}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <h2
                      className={`${SERIF} flex items-baseline gap-3 text-balance text-[1.625rem] font-semibold leading-tight tracking-[-0.015em] text-brand-900 dark:text-white`}
                    >
                      <span className="text-base font-semibold tabular-nums text-amber-500/70 lg:hidden">
                        {index + 1}.
                      </span>
                      <span>{section.title}</span>
                    </h2>
                    <div
                      className={`${SERIF} mt-5 max-w-[64ch] space-y-5 text-[1.0625rem] leading-[1.75] sm:text-[1.1875rem] text-gray-700 dark:text-gray-300`}
                    >
                      {section.body}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {footer ? (
              <div
                className={`${SERIF} mt-6 max-w-[64ch] border-t border-gray-200/90 pt-12 text-[1.0625rem] leading-relaxed text-gray-700 dark:border-white/[0.08] dark:text-gray-300`}
              >
                {footer}
              </div>
            ) : null}

            <p className="mt-16 max-w-[64ch] border-t border-gray-200/90 pt-8 text-sm leading-relaxed text-gray-500 dark:border-white/[0.08] dark:text-gray-400">
              Une question sur ce document ? Écrivez-nous à{" "}
              <a
                href="mailto:bvgroupe25@gmail.com"
                className="font-medium text-brand-600 underline decoration-amber-400/70 decoration-2 underline-offset-4 dark:text-brand-200"
              >
                bvgroupe25@gmail.com
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

/** Liste à puces harmonisée pour les documents légaux. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400/80 dark:bg-amber-300/70"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Encadré de mise en avant (information importante). */
export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-amber-400 bg-amber-50/60 py-4 pl-5 pr-5 text-[1.0625rem] leading-relaxed text-brand-900 dark:bg-amber-300/[0.07] dark:text-amber-50">
      {children}
    </div>
  );
}

/** Bloc de coordonnées / identité. */
export function LegalCard({ children }: { children: ReactNode }) {
  return (
    <div className="border border-gray-200 bg-white px-6 py-5 text-[1rem] leading-relaxed shadow-[0_1px_2px_rgba(15,39,68,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
      {children}
    </div>
  );
}

/** Tableau de données : reste en sans-serif, plus lisible qu'en labeur serif. */
export function LegalTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div>
      {/* Le tableau déborde en pleine largeur sur mobile sans faire défiler la page. */}
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className={`w-full min-w-[38rem] border-collapse text-left text-sm ${SANS}`}>
          <thead>
            <tr className="border-y border-brand-900/15 dark:border-white/15">
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-3 pr-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells) => (
              <tr
                key={cells[0]}
                className="border-b border-gray-200/80 align-top dark:border-white/[0.08]"
              >
                {cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`py-3.5 pr-6 ${
                      i === 0
                        ? "font-medium text-brand-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`${SANS} mt-3 text-xs text-gray-400 sm:hidden dark:text-gray-500`}>
        Faites glisser le tableau horizontalement pour voir toutes les colonnes.
      </p>
    </div>
  );
}

/** Mention de clôture et signature du document. */
export function LegalSignature({
  place,
  date,
  name,
  role,
}: {
  place: string;
  date: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
      <p className="text-gray-600 dark:text-gray-400">
        Fait à {place}, le {date}.
      </p>
      <div className="sm:text-right">
        <p
          className={`${SANS} text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500`}
        >
          Pour BI LINKS
        </p>
        <p className="mt-3 text-[1.5rem] italic leading-tight text-brand-900 dark:text-white">
          {name}
        </p>
        <p className={`${SANS} mt-1.5 text-sm text-gray-500 dark:text-gray-400`}>{role}</p>
      </div>
    </div>
  );
}
