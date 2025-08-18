import dotenv from "dotenv";
import { fetchFigmaFile } from "./utils/fetchFigmaFile";
import { walkAndParse } from "./walker/walkAndParse";

dotenv.config();

async function main() {
  const json = await fetchFigmaFile();
  const parsed = walkAndParse(json.document);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
