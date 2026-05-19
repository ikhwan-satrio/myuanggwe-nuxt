
export function formatDate(date: string | number) {
  const d = typeof date === "number" ? new Date(date * 1000) : new Date(date);
  return d.toLocaleDateString("id-ID");
}
