const SOL = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const SOL_COMPACT = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export const fmt = (n: number) => SOL.format(n);
export const fmtCompact = (n: number) => SOL_COMPACT.format(n);
export const fmtPercent = (n: number) =>
  new Intl.NumberFormat("es-PE", { style: "percent", maximumFractionDigits: 1 }).format(n / 100);
