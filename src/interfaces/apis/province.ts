"use client";

export interface IRajaOngkirProvinceResponse {
	rajaongkir: {
		query: {
			id: string | any;
		};
		status: {
			code: number | any;
			description: string | any;
		};
		results: {
			province_id: string | any;
			province: string | any;
		};
	};
}
