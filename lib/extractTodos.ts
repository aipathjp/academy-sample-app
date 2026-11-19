// 議事録の内容から、ToDo の候補を取り出す（上級 第6章）
// 「ToDo：」「ToDo:」で始まる行を候補にする（大文字・小文字と、行の頭の「・」「-」は気にしない）

const MARK = /^(?:[・\-*]\s*)?todo\s*[：:]\s*/i;

export function extractTodos(notes: string | null | undefined): string[] {
  const found: string[] = [];
  // 内容が空（null）のときは、候補なし
  for (const line of (notes ?? "").split("\n")) {
    const trimmed = line.trim();
    if (!MARK.test(trimmed)) continue;
    const content = trimmed.replace(MARK, "").trim();
    if (content && !found.includes(content)) found.push(content);
  }
  return found;
}
