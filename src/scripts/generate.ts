import { readdir, lstat } from "fs/promises";
import { join } from "path";

const articlesDir = join(__dirname, "../../public/articles");
const staticPaths = join(__dirname, "./staticPaths.ts");
const staticPathsFile = Bun.file(staticPaths).writer();

async function collect(dir: string) {
	const o: Record<string, unknown> = {};
	const files = await readdir(dir);

	for (const file of files) {
		const newPath = join(dir, file);

		if ((await lstat(newPath)).isDirectory()) {
			if ((await readdir(newPath)).includes("index.md")) {
				console.log(newPath);

				const content = await Bun.file(join(newPath, "index.md")).text();
				const title = content.match(/# (.+)\n/)?.[1] ?? "Безымянный";
				const link = newPath.slice(newPath.indexOf("/articles/"));

				staticPathsFile.write(`\t"${link}",\n`);

				o[file] = { title, link };
			} else {
				o[file] = await collect(newPath);
			}
		}
	}
	return o;
}

await Bun.write(staticPaths, "");
staticPathsFile.write("export const staticPaths = [\n");
const collection = await collect(articlesDir);
staticPathsFile.write("];\n");
staticPathsFile.end();

const json = JSON.stringify(collection, null, 2);

await Bun.write(
	join(__dirname, "../constants/endpoints.ts"),
	`import { Endpoints } from "../types/Endpoint";\n\nexport const endpoints = ${json} satisfies Endpoints`
);

console.log(json);
