"use client";

import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface ICustomButtonProps extends BaseButtonProps {
	buttonTitle: string;
	htmlType: string | any;
}
const CustomButton = ({
	type,
	buttonTitle,
	htmlType,
	size,
}: ICustomButtonProps) => {
	return (
		<Button
			className="flex w-full bg-sekawan-primary font-poppins"
			type={type}
			htmlType={htmlType}
			size={size}
		>
			{buttonTitle}
		</Button>
	);
};

export default CustomButton;
