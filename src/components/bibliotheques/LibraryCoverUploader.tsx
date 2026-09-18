"use client";

import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import Label from "@/components/form/Label";
import { PencilIcon } from "@/icons";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

type LibraryCoverUploaderProps = {
  /** Aperçu affiché : data URL (nouveau fichier) ou URL distante (couverture existante). */
  previewUrl: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  /** Texte d'aide sous le titre — dépend du fallback réel (icône choisie ou icône générique). */
  hint?: string;
};

export function LibraryCoverUploader({
  previewUrl,
  onChange,
  hint = "Facultative : si aucune couverture n'est fournie, l'icône symbolique ci-dessous est affichée à la place.",
}: LibraryCoverUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error("Format non supporté. Utilisez JPEG, PNG, WebP ou SVG.");
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        toast.error("Image trop volumineuse (max 5 Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => onChange(file, reader.result as string);
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <Label>Couverture</Label>
      <p className="mb-3 text-theme-xs text-gray-500 dark:text-gray-400">{hint}</p>
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt=""
              className="h-20 w-20 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition-opacity duration-200 group-hover:bg-black/40 group-hover:opacity-100"
              title="Changer"
            >
              <PencilIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={clear}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-error-600 shadow ring-1 ring-black/5 transition hover:scale-105 dark:bg-gray-800"
              title="Supprimer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed text-gray-400 transition ${
              isDragging
                ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10"
                : "border-gray-200 hover:border-brand-400 hover:text-brand-500 dark:border-gray-700"
            }`}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </button>
        )}
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-medium text-brand-500 hover:text-brand-600"
          >
            {previewUrl ? "Changer l'image" : "Choisir une image"}
          </button>
          <p className="mt-1 text-[11px] text-gray-400">JPEG, PNG, WebP ou SVG · max 5 Mo</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
}
