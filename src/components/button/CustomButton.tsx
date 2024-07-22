"use client";

import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface ICustomButtonProps extends BaseButtonProps {
	buttonTitle: string;
	htmlType: string | any;
	onClick?: () => void;
}
const CustomButton = ({
	type,
	buttonTitle,
	htmlType,
	size,
	onClick,
}: ICustomButtonProps) => {
	return (
		<Button
			className="flex w-full bg-sekawan-primary font-poppins"
			type={type}
			htmlType={htmlType}
			size={size}
			onClick={onClick}
		>
			{buttonTitle}
		</Button>
	);
};

export default CustomButton;
