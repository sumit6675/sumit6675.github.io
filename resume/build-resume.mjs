/**
 * Renders resume/resume.html to public/Sumit_Chimkar_Resume.pdf.
 * Run with: npm run resume
 */
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(here, "resume.html");
const output = path.join(here, "build", "Sumit_Chimkar_Resume.pdf");

await (await import("node:fs/promises")).mkdir(path.join(here, "build"), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto(`file://${source}`, { waitUntil: "load" });
await page.pdf({
  path: output,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log("wrote", output);
console.log("To publish it, copy it over public/Sumit_Chimkar_Resume.pdf.");
