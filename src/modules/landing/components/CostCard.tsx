// THIS FOR MODULE SCOPE COMPONENTS
import { ICostService } from "@interfaces/apis/cost";
import { rupiahFormatter } from "@libs/functions";
import { Card } from "antd";
import React from "react";

interface ICostCardProps {
	data: ICostService;
}

const CostCard = ({ data }: ICostCardProps) => {
	return (
		<Card className="mt-2 border-2 rounded-lg shadow-lg w-full min-h-[100px]">
			<h3 className=" text-gray-400 font-poppins font-semibold text-lg">
				{data.service} ({data.cost[0].etd} Hari)
			</h3>
			<h4 className="font-poppins font-normal text-sm">{data.description}</h4>
			<h5 className="font-poppins font-medium text-2xl mt-2">
				{rupiahFormatter(data.cost[0].value)}
			</h5>
		</Card>
	);
};

export default CostCard;
