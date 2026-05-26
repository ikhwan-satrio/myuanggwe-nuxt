function formatDate(date) {
  const d = typeof date === "number" ? new Date(date * 1e3) : new Date(date);
  return d.toLocaleDateString("id-ID");
}

export { formatDate as f };
//# sourceMappingURL=useTimeStamps-Cdn7G1h2.mjs.map
