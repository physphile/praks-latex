export interface Endpoint {
	title: string;
	link: string;
}

export interface Endpoints {
	[name: string]: Endpoints | Endpoint;
}
