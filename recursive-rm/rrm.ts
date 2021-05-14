import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.96.0/path/mod.ts";
import {
  emptyDirSync,
  existsSync,
  walk,
} from "https://deno.land/std@0.96.0/fs/mod.ts";

const flags = parse(Deno.args);
const target: string = flags._.length > 0
  ? join(Deno.cwd(), String(flags._[0]))
  : Deno.cwd();
const rmDir = String(flags["delete-dir"]).toLowerCase() === "true";
const pattern = flags.pattern;

const doesExist = existsSync(target);

if (!doesExist) {
  console.error(`Target file/folder does not exist: ${target}`);
  Deno.exit(1);
}

if (typeof pattern !== "string" && flags._.length === 0 && rmDir) {
  // Delete all contents of current directory
  emptyDirSync(target);
  Deno.exit(0);
}

if (typeof pattern !== "string" && rmDir) {
  Deno.removeSync(target);
  Deno.exit(0);
}

const options = {
  includeFiles: true,
  includeDirs: rmDir,
  match: typeof pattern === "string" ? [new RegExp(pattern)] : [],
};

for await (const item of walk(target, options)) {
  if (item.path === target) continue;
  Deno.removeSync(item.path);
}
