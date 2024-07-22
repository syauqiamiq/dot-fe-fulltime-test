import { IRajaOngkirProvinceResponse } from "@interfaces/apis/province";
import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
	message: string;
};

const { RAJA_ONGKIR_SERVERSIDE_API_URL, RAJA_ONGKIR_API_KEY } = process.env;

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id") || "";

		const queryParams = new URLSearchParams();

		if (id) queryParams.append("id", id);

		const response = await axios.get(
			`${RAJA_ONGKIR_SERVERSIDE_API_URL}/province?${queryParams.toString()}`,
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
