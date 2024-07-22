"use client";

import { IRajaOngkirProvinceResponse } from "@interfaces/apis/province";
import { baseApi } from "../config/base-query";
import { IRajaOngkirCityResponse } from "@interfaces/apis/city";
import {
	IRajaOngkirCostRequest,
	IRajaOngkirCostResponse,
} from "@interfaces/apis/cost";

export const rajaOngkirProvinceApi = baseApi
	.enhanceEndpoints({})
	.injectEndpoints({
		endpoints: (builder) => {
			return {
				getRajaOngkirProvince: builder.query<
					IRajaOngkirProvinceResponse,
					{ id: number | any }
				>({
					query: ({ id }: { id: number | any }) => ({
						method: "GET",
						url: `/raja-ongkir/province?id=${id}`,
						cache: "no-cache",
					}),
				}),
				getRajaOngkirCity: builder.query<
					IRajaOngkirCityResponse,
					{
						id: number | any;
						province: number | any;
					}
				>({
					query: ({
						id,
						province,
					}: {
						id: number | any;
						province: number | any;
					}) => ({
						method: "GET",
						url: `/raja-ongkir/city?id=${id}&province=${province}`,
						cache: "no-cache",
					}),
				}),
				getRajaOngkirCost: builder.mutation<
					IRajaOngkirCostResponse,
					IRajaOngkirCostRequest
				>({
					query: (data: IRajaOngkirCostRequest) => ({
						method: "POST",
						url: "/raja-ongkir/cost",
						cache: "no-cache",
						body: data,
					}),
				}),
			};
		},
	});

export const {
	useGetRajaOngkirProvinceQuery,
	useGetRajaOngkirCityQuery,
	useGetRajaOngkirCostMutation,
} = rajaOngkirProvinceApi;
