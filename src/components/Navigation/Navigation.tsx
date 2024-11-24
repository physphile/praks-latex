import { NavigationItem } from "./NavigationItem";
import styles from "./Navigation.module.css";
import { Component } from "solid-js";
import { Endpoints } from "~/types/Endpoint";

interface Props {
	endpoints: Endpoints;
}

export const Navigation: Component<Props> = ({ endpoints }) => {
	return (
		<div class={styles.navigation}>
			<a href="/">Главная</a>
			<NavigationItem endpoints={endpoints} class={styles.root}></NavigationItem>
		</div>
	);
};
