#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { readdir } from "fs/promises";
import prompts from "prompts";

type CliOptions = {
  projectDir?: string;
  template?: string;
  showHelp?: boolean;
  showVersion?: boolean;
};

const IGNORED_NAMES = new Set(["node_modules", ".turbo", ".next"]);

function parseArgs(): CliOptions {
  const options: CliOptions = {};
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      options.showHelp = true;
      continue;
    }

    if (arg === "--version" || arg === "-v") {
      options.showVersion = true;
      continue;
    }

    if (arg === "--template" || arg === "-t") {
      options.template = args[i + 1];
      i += 1;
      continue;
    }

    if (arg.startsWith("--template=")) {
      options.template = arg.split("=")[1];
      continue;
    }

    if (!arg.startsWith("-") && !options.projectDir) {
      options.projectDir = arg;
    }
  }

  return options;
}

function resolveTemplateDir(templateName: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatesRoot = path.resolve(__dirname, "../templates");
  return path.join(templatesRoot, templateName);
}

function resolveTemplatesRoot(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, "../templates");
}

async function getPackageVersion(): Promise<string> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const packageJsonPath = path.resolve(__dirname, "../package.json");

  try {
    const pkg = await fs.readJson(packageJsonPath);
    return typeof pkg.version === "string" ? pkg.version : "unknown";
  } catch {
    return "unknown";
  }
}

async function getAvailableTemplates(): Promise<string[]> {
  const dir = resolveTemplatesRoot();
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function ensureEmptyDir(targetDir: string) {
  const exists = await fs.pathExists(targetDir);
  if (!exists) {
    await fs.ensureDir(targetDir);
    return;
  }

  const files = await fs.readdir(targetDir);
  if (files.length > 0) {
    throw new Error(`Destination ${targetDir} is not empty.`);
  }
}

function shouldCopy(src: string, baseDir: string): boolean {
  const relative = path.relative(baseDir, src);
  if (!relative) return true;
  const segments = relative.split(path.sep);
  return !segments.some((segment) => IGNORED_NAMES.has(segment));
}

async function chooseTemplate(templates: string[], defaultTemplate: string): Promise<string> {
  if (templates.length === 1) return defaultTemplate;

  const response = await prompts({
    type: "select",
    name: "template",
    message: "Select template version",
    choices: templates.map((value) => ({ title: value, value })),
    initial: templates.indexOf(defaultTemplate),
  });

  return response.template ?? defaultTemplate;
}

async function chooseProjectDir(): Promise<string> {
  const response = await prompts({
    type: "text",
    name: "dir",
    message: "Project name",
    initial: "next-wora-app",
  });

  if (!response.dir || typeof response.dir !== "string") {
    throw new Error("Project name is required.");
  }

  return response.dir.trim();
}

function printHelp(templates: string[], defaultTemplate?: string) {
  console.log("Usage: create-next-wora [project-directory] [--template <name>]");
  console.log("Options:");
  console.log("  --template, -t   Choose template version to scaffold");
  console.log("  --help, -h       Show this message");
  console.log("  --version, -v    Print CLI version");

  if (templates.length > 0) {
    console.log(
      `Available templates: ${templates.join(", ")}${defaultTemplate ? ` (default: ${defaultTemplate})` : ""}`
    );
  }
}

async function run() {
  const args = parseArgs();

  if (args.showVersion) {
    console.log(await getPackageVersion());
    return;
  }

  const projectDirInput = args.projectDir ?? (await chooseProjectDir());
  const projectDir = path.resolve(process.cwd(), projectDirInput);

  const templates = await getAvailableTemplates();
  if (templates.length === 0) {
    throw new Error("No templates available in this build.");
  }

  const defaultTemplate = templates.includes("latest") ? "latest" : templates[0];

  if (args.showHelp) {
    printHelp(templates, defaultTemplate);
    return;
  }

  const requestedTemplate = args.template;
  const templateName = requestedTemplate
    ? templates.includes(requestedTemplate)
      ? requestedTemplate
      : defaultTemplate
    : await chooseTemplate(templates, defaultTemplate);
  const templateDir = resolveTemplateDir(templateName);

  const templateExists = await fs.pathExists(templateDir);
  if (!templateExists) {
    throw new Error(`Template '${templateName}' is not available in this build.`);
  }

  await ensureEmptyDir(projectDir);

  await fs.copy(templateDir, projectDir, {
    overwrite: false,
    errorOnExist: true,
    filter: (src) => shouldCopy(src, templateDir),
  });

  console.log(`Project created at ${projectDir}`);
  console.log("Next steps:");
  console.log(`  cd ${projectDirInput}`);
  console.log("  npm install");
}

run().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
