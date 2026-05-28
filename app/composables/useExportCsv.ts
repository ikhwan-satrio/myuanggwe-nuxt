export function useExportCsv() {
  function downloadCsv(filename: string, headers: string[], rows: any[][]) {
    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        row.map(cell => {
          const val = String(cell ?? '')
          return val.includes(',') || val.includes('"') || val.includes('\n')
            ? `"${val.replace(/"/g, '""')}"`
            : val
        }).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return { downloadCsv }
}
