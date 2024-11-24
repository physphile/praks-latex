import { Endpoints } from "../types/Endpoint";

export const endpoints = {
	genphys: {
		OFP: {
			Молекулярка: {},
			VTEK: {
				"1": {
					title:
						"Лабораторная работа №1. Измерение линейных размеров и определение плотности тел, имеющих правильную геометрическую форму",
					link: "/articles/genphys/OFP/VTEK/1",
				},
				"2": {
					title: "Лаб. 2",
					link: "/articles/genphys/OFP/VTEK/2",
				},
			},
			Оптика: {},
			Элмаг: {},
			Механика: {},
		},
	},
} satisfies Endpoints;
