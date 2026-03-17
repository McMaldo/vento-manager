const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"') {
      if (inQuotes && next === '"') {
        // escaped quote
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && ch === ";") {
      row.push(cur);
      cur = "";
      continue;
    }
    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      // handle CRLF
      if (ch === "\r" && next === "\n") {
        // skip \n in next iteration
        continue;
      }
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
      // skip lone \r or \n handling continues
      continue;
    }
    cur += ch;
  }
  // final push
  if (cur !== "" || inQuotes || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
};

export default parseCSV;
