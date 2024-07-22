"use client";

import { useGetRajaOngkirProvinceQuery } from "@libs/apis/endpoint/raja-ongkir";
import { Card } from "antd";
import Image from "next/image";

const LandingPage = () => {
	const { data } = useGetRajaOngkirProvinceQuery({
		id: "",
	});
	return (
		<div className="bg-white flex w-full min-h-[100vh] justify-center items-center">
			<Card className="border-2 rounded-lg shadow-lg min-w-[600px] min-h-[700px]">
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>
		</div>
	);
};

export default LandingPage;
