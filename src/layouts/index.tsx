import { Component, JSXElement } from "solid-js";
import { Navigation } from "~/components/Navigation/Navigation";
import { endpoints } from "~/constants/endpoints";

import styles from "./index.module.css";

export const Layout: Component<{ children: JSXElement }> = ({ children }) => {
	return (
		<>
			<Navigation endpoints={endpoints} />
			<div class={styles.container}>{children}</div>
		</>
	);
};
