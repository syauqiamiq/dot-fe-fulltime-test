"use client";

import { BaseSyntheticEvent } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Input, InputProps, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface ISelectInputProps extends InputProps {
	placeHolder?: string;
	name: string;
	formTitle?: string;
	options?: {
		value: string;
		label: string;
	}[];
	extraOnChange?: (event: BaseSyntheticEvent) => void;

	showSearch?: boolean | false;
}

export const SelectInput = ({
	name,
	placeHolder,
	formTitle,
	options,
	showSearch = false,
	extraOnChange,
}: ISelectInputProps) => {
	const { control } = useFormContext();
	const { field, fieldState } = useController({ name, control });
	const { error } = fieldState;

	const handleCustomChange = (input: BaseSyntheticEvent) => {
		// Call field.onChange to update the field value
		field.onChange(input);

		if (extraOnChange) {
			extraOnChange(input);
		}
	};

	return (
		<div className="flex w-full flex-col">
			{formTitle && (
				<div className="flex justify-between mb-1">
					<h5 className=" md:text-base text-sm font-poppins">{formTitle}</h5>
				</div>
			)}
			<Select
				{...field}
				placeholder={placeHolder}
				showSearch={showSearch}
				optionFilterProp="label"
				onChange={handleCustomChange}
				options={options}
				{...(Boolean(error) && { status: "error" })}
			/>
			{Boolean(error) && (
				<span className="text-red-400 text-start">{error?.message}</span>
			)}
		</div>
	);
};
