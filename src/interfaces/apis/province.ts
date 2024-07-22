"use client";

export interface IRajaOngkirProvince {
	province_id: string | any;
	province: string | any;
}
export interface IRajaOngkirProvinceResponse {
	rajaongkir: {
		query: {
			id: string | any;
		};
		status: {
			code: number | any;
			description: string | any;
		};
		results: IRajaOngkirProvince[];
	};
}
