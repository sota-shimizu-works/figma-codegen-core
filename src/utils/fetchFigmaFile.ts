import fs from "fs";
import path from "path";

export async function fetchFigmaFile() {
  const token = process.env.FIGMA_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;

  if (!token) throw new Error("FIGMA_TOKEN not set");
  if (!fileKey) throw new Error("FIGMA_FILE_KEY not set");

  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": token,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Figma API error: ${res.status} ${msg}`);
  }

  const data = await res.json();

  const filePath = path.resolve(process.cwd(), "figma-fetch-debug.json");
  fs.writeFileSync(
    filePath,
    JSON.stringify(data.document.children, null, 2),
    "utf-8"
  );

  console.log(`📦 fetch result saved to ${filePath}`);

  return data;
}
