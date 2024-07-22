import { IRajaOngkirProvinceResponse } from "@interfaces/apis/province";
import axios, { AxiosResponse } from "axios";
import { request } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
	message: string;
};

const { RAJA_ONGKIR_SERVERSIDE_API_URL, RAJA_ONGKIR_API_KEY } = process.env;

export const POST = async (req: Request) => {
	try {
		const { origin, destination, weight, courier } = await req.json();
		const response = await axios.post(
			`${RAJA_ONGKIR_SERVERSIDE_API_URL}/cost`,
			{
				origin,
				destination,
				weight,
				courier,
			},
			{
				headers: {
					key: RAJA_ONGKIR_API_KEY,
				},
			}
		);
		return new NextResponse(JSON.stringify(response.data), {
			status: response.status,
		});
	} catch (error) {
		return new NextResponse("error fetching raja ongkir", {
			status: 500,
		});
	}
};
