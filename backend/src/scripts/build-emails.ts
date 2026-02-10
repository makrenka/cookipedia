import { execSync } from "child_process";
import { globSync } from "glob";
import { mkdirSync, rmSync } from "fs";

function normalizePath(p: string) {
  return p.replace(/\\/g, "/"); // замяняе \ на /
}

function buildEmails() {
  const distDir = "./src/emails/dist";

  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  const files = globSync("./src/emails/!(_)*.mjml");
  if (files.length === 0) {
    return;
  }

  for (const file of files) {
    const normalizedFile = normalizePath(file);
    execSync(`mjml "${normalizedFile}" -o "${normalizePath(distDir)}"`, {
      stdio: "inherit",
    });
  }
}

buildEmails();
