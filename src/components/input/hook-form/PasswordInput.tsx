"use client";

import { BaseSyntheticEvent } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Input, InputProps } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IPasswordInputProps extends InputProps {
	type?: string;
	formTitle?: string;
	placeHolder?: string;
	name: string;
	required?: boolean;
	extraOnChange?: (event: BaseSyntheticEvent) => void;
	disabled?: boolean;
}

export const PasswordInput = ({
	name,
	placeHolder,
	type,
	disabled,
	extraOnChange,
	size,
	formTitle,
}: IPasswordInputProps) => {
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
			<Input.Password
				name={field.name}
				ref={field.ref}
				onBlur={field.onBlur}
				size={size}
				iconRender={(visible) =>
					visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
				}
				value={field.value}
				type={type}
				disabled={disabled}
				placeholder={placeHolder}
				onChange={handleCustomChange}
				{...(Boolean(error) && { status: "error" })}
			/>
			{Boolean(error) && (
				<span className="text-red-400 text-start">{error?.message}</span>
			)}
		</div>
	);
};
