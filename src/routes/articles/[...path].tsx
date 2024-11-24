import { useParams } from "@solidjs/router";
import { join } from "path";
import { marked } from "marked";
import { readFile } from "fs/promises";
import { createResource } from "solid-js";
import markedKatex from "marked-katex-extension";
import styles from "./Articles.module.css";
import { avif } from "./avif";
import { Layout } from "~/layouts";
import "./katex.css";

marked.use(markedKatex({ strict: false, throwOnError: false, output: "mathml" }));
marked.use(avif);

const getHtml = async (path: string) => {
	"use server";
	const dir = join("public/articles/", path);
	const filepath = join(dir, "index.md");
	const text = await readFile(filepath, "utf-8");
	const modifiedText = text
		.replace(/\\\[(.+)\\\]/g, "$$\n$1\n$$")
		.replace(/(\s)---(\s)/g, "$1&mdash;$2")
		.replace(/(\d)--(\d)/g, "$1&ndash;$2")
		.replace(/[рР]ис\.\s(\d+)/g, "Рис.&nbsp;$1")
		.replace(/src="(.*)"/g, (_, image) => `src="${dir.slice(dir.indexOf("/articles/"))}/${image}"`);
	return marked(modifiedText);
};

export default function Articles() {
	const params = useParams();

	const [html] = createResource(() => getHtml(params.path));

	return (
		<Layout>
			<div innerHTML={html()} class={styles.article} lang="ru"></div>
		</Layout>
	);
}
