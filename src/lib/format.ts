export function formatDuration(start: string | null, end: string | null): string {
  if (!start) return "En cours";
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  if (!e) return "En cours";
  const days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 30) return `${days} jour${days > 1 ? "s" : ""}`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} mois`;
  }
  const years = Math.floor(days / 365);
  return `${years} an${years > 1 ? "s" : ""}`;
}

export function formatDateFr(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
