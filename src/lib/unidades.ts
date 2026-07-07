export const UNIDADES = [
  { value: "ceu-bonsucesso", label: "CEU Bonsucesso", capacidade: 200 },
  { value: "ceu-continental", label: "CEU Continental", capacidade: 200 },
] as const;

export const CURSO_AO_VIVO = { value: "ao-vivo", label: "Curso 100% Online" } as const;

export type UnidadeValue = (typeof UNIDADES)[number]["value"] | typeof CURSO_AO_VIVO.value;
