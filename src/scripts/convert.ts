import { readdir, lstat } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export const imageRegex = /\.(jpg|png|jpeg|JPG|webp)$/;

const articlesDir = join(__dirname, "../../public/articles");

let oldSizeTotal = 0;
let newSizeTotal = 0;

async function avif(dir: string) {
	const files = await readdir(dir);

	for (const file of files) {
		const newPath = join(dir, file);

		if ((await lstat(newPath)).isDirectory()) {
			await avif(newPath);
		} else if (imageRegex.test(file)) {
			const writer = Bun.file(join(dir, file.replace(imageRegex, ".avif"))).writer();

			const buffer = await sharp(newPath).avif().toBuffer();

			writer.write(buffer);
			writer.end();

			const filePath = join(dir, file);
			const oldSize = Bun.file(filePath).size;
			const newSize = buffer.length;
			const percents = (newSize / oldSize) * 100 - 100;

			console.log(
				`${filePath.slice(filePath.indexOf("/articles/") + 9)} \x1b[${
					percents > 0 ? 31 : 32
				}m${percents > 0 ? "+" : ""}${percents.toFixed(1)}%\x1b[0m`
			);

			oldSizeTotal += oldSize;
			newSizeTotal += newSize;
		}
	}
}

await avif(articlesDir);

const percents = (newSizeTotal / oldSizeTotal) * 100 - 100;

console.log(
	`\x1b[${newSizeTotal > oldSizeTotal ? 41 : 42}mTransformed ${(oldSizeTotal / 1024).toFixed(
		1
	)} KB images to ${(newSizeTotal / 1024).toFixed(1)} KB avif (${
		percents > 0 ? "+" : ""
	}${percents.toFixed(1)}%)\x1b[0m`
);
