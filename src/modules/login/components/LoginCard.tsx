import { yupResolver } from "@hookform/resolvers/yup";

import { Card, message } from "antd";

import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup";
import CustomButton from "../../../components/button/CustomButton";
import { FormInput } from "../../../components/input/hook-form/FormInput";
import { PasswordInput } from "../../../components/input/hook-form/PasswordInput";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const defaultValues = {
	email: "",
	password: "",
};

const formSchema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();

const LoginCard = () => {
	const [cookies, setCookie] = useCookies();
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();

	const formMethods = useForm({
		defaultValues: defaultValues,
		mode: "onSubmit",
		resolver: yupResolver(formSchema),
	});
	const { handleSubmit } = formMethods;

	const onSubmit = (data: any) => {
		// DO SOME ACTION

		if (data.email == "guest@email.com" && data.password == "guest") {
			setCookie("auth-Cookie", "NAFDSNIFASNDIFANISFNIASVNIJ", {
				path: "/",
				maxAge: 300,
			});
			router.replace("/");
		} else {
			messageApi.open({
				type: "error",
				content: "Email atau Password Salah",
			});
		}
	};
	return (
		<Card className="flex justify-center text-center min-w-screen m-5 md:m-0 md:w-[500px] = shadow-lg shadow-gray-200 ">
			{contextHolder}
			<h3 className="mb-5 font-poppins md:text-2xl text-xl font-bold ">
				Masuk ke fitur utama
			</h3>
			<h4 className="mb-8 font-poppins md:text-base text-xs text-gray-400 font-medium">
				Masukkan email dan kata sandi Anda di bawah ini
			</h4>

			<div className="flex flex-col gap-2">
				<span>Email: guest@email.com</span>
				<span>Password: guest</span>
			</div>
			<FormProvider {...formMethods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-10">
						<div className="flex flex-col ">
							<div className="flex justify-between mb-1">
								<h5 className="text-gray-400 md:text-base text-sm font-poppins ">
									Email
								</h5>
							</div>
							<FormInput name="email" size="large" placeHolder="Email" />
						</div>
						<div className="flex flex-col ">
							<div className="flex justify-between mb-1">
								<h5 className="text-gray-400 md:text-base text-sm font-poppins ">
									Password
								</h5>
								<h5 className="text-gray-400 md:text-base text-sm font-poppins  cursor-pointer">
									Lupa Password
								</h5>
							</div>
							<PasswordInput
								name="password"
								size="large"
								placeHolder="Password"
								type="password"
							/>
						</div>
						<div>
							<CustomButton
								buttonTitle="Masuk"
								htmlType="submit"
								type="primary"
								size="large"
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Card>
	);
};

export default LoginCard;
