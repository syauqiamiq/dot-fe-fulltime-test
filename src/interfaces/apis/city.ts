export interface IRajaOngkirCity {
	province_id: string | any;
	city_id: string | any;
	province: string | any;
	type: string | any;
	city_name: string | any;
	postal_code: string | any;
}

export interface IRajaOngkirCityResponse {
	rajaongkir: {
		query: {
			id: string | any;
			province: string | any;
		};
		status: {
			code: number | any;
			description: string | any;
		};
		results: IRajaOngkirCity[];
	};
}
