import * as yup from "yup";

export const defaultValues = {
	origin_province: null,
	origin_city: null,
	destination_province: null,
	destination_city: null,
	weight: null,
	courier: null,
};

export const formSchema = yup
	.object({
		origin_province: yup.string().nullable().required(),
		origin_city: yup.string().nullable().required(),
		destination_province: yup.string().nullable().required(),
		destination_city: yup.string().nullable().required(),
		weight: yup.string().nullable().required(),
		courier: yup.string().nullable().required(),
	})
	.required();
