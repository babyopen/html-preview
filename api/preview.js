import { writeFile } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const name = randomBytes(3).toString("hex") + ".html";
  const path = join(process.cwd(), "public", name);
  await writeFile(path, req.body, "utf8");

  const url = `${req.headers["x-forwarded-proto"]}://${req.headers.host}/${name}`;
  res.json({ url });
}

export const config = {
  api: { bodyParser: { sizeLimit: "2mb" } }
};
