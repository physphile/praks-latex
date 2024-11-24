import { MarkedExtension } from "marked";

export const avif: MarkedExtension = {
	renderer: {
		html(token) {
			if (/<figure\>[\s\S]*<\/figure>/.test(token.raw)) {
				return token.raw.replace(
					/<img[^<]*src="((.*)\..*)"[^<]*>/g,
					`<picture>\n\t<source type="image/avif" srcset="$2.avif">\n\t<img src="$1" loading="lazy" decoding="async">\n</picture>`
				);
			}
			return token.text;
		},
	},
};
