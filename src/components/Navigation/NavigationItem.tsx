import { cn } from "~/utils/cn";
import styles from "./NavigationItem.module.css";
import { Component, For } from "solid-js";
import { Endpoints } from "~/types/Endpoint";

interface Props {
	endpoints: Endpoints;
	class?: string;
}

const shrink = (s: string) => `${s.slice(0, 56)}${s.length > 56 ? "..." : ""}`;

export const NavigationItem: Component<Props> = ({ endpoints, class: className }) => {
	return (
		<ol>
			<For each={Object.keys(endpoints)}>
				{e =>
					"title" in endpoints[e] ? (
						<li class={styles.li}>
							<a href={endpoints[e].link as string} lang="ru" class={styles.link}>
								{shrink(endpoints[e].title as string)}
							</a>
						</li>
					) : (
						<details class={cn(styles.details, className)} open>
							<summary data-state="open" class={styles.summary}>
								{e}
							</summary>
							<div class={styles.content}>
								{Object.keys(endpoints[e]).length ? (
									<NavigationItem endpoints={endpoints[e]} />
								) : (
									"Пока нету"
								)}
							</div>
						</details>
					)
				}
			</For>
		</ol>
	);
};
