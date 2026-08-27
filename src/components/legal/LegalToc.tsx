"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/**
 * Sommaire latéral « suiveur » + jauge de lecture.
 *
 * Client component : c'est le seul morceau interactif des pages légales, le
 * reste du document restant rendu statiquement côté serveur.
 *
 * L'article actif est déduit des positions à chaque frame plutôt que d'un
 * IntersectionObserver : les deux sources se contredisaient en bas de page,
 * où l'observer réactivait l'avant-dernier article.
 */
export function LegalToc({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    let frame = 0;
    const measure = () => {
      frame = 0;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(ratio);

      if (ratio > 0.99) {
        // Fin du document : le dernier article est forcément celui qu'on lit.
        setActiveId(nodes[nodes.length - 1].id);
        return;
      }

      // Dernier article dont le haut est déjà passé sous le quart supérieur.
      const line = window.innerHeight * 0.25;
      let current = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
        else break;
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <>
      {/* Jauge de lecture */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent print:hidden"
      >
        <div
          className="h-full origin-left bg-amber-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav aria-label="Sommaire" className="hidden lg:block print:hidden">
        <div className="sticky top-14">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Sommaire
          </p>
          <ol className="mt-6 space-y-px border-l border-gray-200 dark:border-white/10">
            {items.map((item, index) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`group -ml-px flex gap-3 border-l-2 py-2 pl-4 text-[0.8125rem] leading-snug transition-colors ${
                      active
                        ? "border-amber-400 font-medium text-gray-900 dark:text-white"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:border-white/25 dark:hover:text-gray-100"
                    }`}
                  >
                    <span
                      className={`w-4 shrink-0 text-right tabular-nums transition-colors ${
                        active
                          ? "text-amber-500"
                          : "text-gray-300 group-hover:text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
