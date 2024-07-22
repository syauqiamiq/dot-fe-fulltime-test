interface IDetails {
	city_id: string | any;
	province_id: string | any;
	province: string | any;
	type: string | any;
	city_name: string | any;
	postal_code: string | any;
}

interface CostService {
	service: string | any;
	description: string | any;
	cost: {
		value: number | any;
		etd: string | any;
		note: string | any;
	}[];
}

interface CostResult {
	code: string | any;
	name: string | any;
	costs: CostService[];
}

export interface IRajaOngkirCostResponse {
	rajaongkir: {
		query: {
			origin: string | any;
			destination: string | any;
			weight: string | any;
			courier: string | any;
		};
		status: {
			code: number | any;
			description: string | any;
		};
		origin_details: IDetails;
		destination_details: IDetails;
		results: CostResult[];
	};
}

export interface IRajaOngkirCostRequest {
	origin: number | any;
	destination: number | any;
	weight: number | any;
	courier: string | any;
}
