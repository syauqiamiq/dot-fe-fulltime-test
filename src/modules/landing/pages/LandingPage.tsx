import CustomButton from "@components/button/CustomButton";
import { FormInput } from "@components/input/hook-form/FormInput";
import { SelectInput } from "@components/input/hook-form/SelectInput";
import BasicSkeleton from "@components/skeleton/BasicSkeleton";
import { courierLists } from "@constants/couriers";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRajaOngkirCity } from "@interfaces/apis/city";
import { IRajaOngkirProvince } from "@interfaces/apis/province";
import {
	useGetRajaOngkirCityQuery,
	useGetRajaOngkirCostMutation,
	useGetRajaOngkirProvinceQuery,
} from "@libs/apis/endpoint/raja-ongkir";
import { Card, message, Skeleton } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import CostCard from "../components/CostCard";
import { defaultValues, formSchema } from "../constants/form-constant";

const LandingPage = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const formMethods = useForm({
		defaultValues: defaultValues,
		mode: "onSubmit",
		resolver: yupResolver<any>(formSchema),
	});
	const { handleSubmit, watch, setValue } = formMethods;
	const {
		data: originProvinceData,
		isLoading: originProvinceLoading,
		isFetching: originProvinceFetching,
		isError: originProvinceError,
	} = useGetRajaOngkirProvinceQuery({
		id: "",
	});
	const {
		data: originCityData,
		isLoading: originCityLoading,
		isFetching: originCityFetching,
		isError: originCityError,
	} = useGetRajaOngkirCityQuery({
		id: "",
		province: watch("origin_province"),
	});
	const {
		data: destinationProvinceData,
		isLoading: destinationProvinceLoading,
		isFetching: destinationProvinceFetching,
		isError: destinationProvinceError,
	} = useGetRajaOngkirProvinceQuery({
		id: "",
	});
	const {
		data: destinationCityData,
		isLoading: destinationCityLoading,
		isFetching: destinationCityFetching,
		isError: destinationCityError,
	} = useGetRajaOngkirCityQuery({
		id: "",
		province: watch("destination_province"),
	});

	const [
		costMutation,
		{
			isLoading: costLoading,
			isError: costError,
			isSuccess: costSuccess,
			data: costData,
		},
	] = useGetRajaOngkirCostMutation();

	const onSubmit = (data: any) => {
		costMutation({
			origin: data.origin_city,
			destination: data.destination_city,
			courier: data.courier,
			weight: data.weight,
		})
			.unwrap()
			.then((res) => {
				messageApi.open({
					type: "success",
					content: "Cek ongkir berhasil",
				});
			})
			.catch((err) => {
				messageApi.open({
					type: "error",
					content: "Terjadi kesalahan",
				});
			});
	};
	return (
		<div className="bg-white flex w-full min-h-[100vh] justify-center items-center">
			{contextHolder}
			<Card className="border-2 rounded-lg shadow-lg min-w-screen md:min-w-[700px] m-5 md:0 min-h-[400px]">
				<h1 className="font-poppins text-2xl font-medium">
					Cek Ongkir / Cek Tarif Ekspedisi
				</h1>
				<h2 className="font-poppins text-base text-gray-400">
					Platform Cek Ongkir JNE, POS Indonesia, dan TIKI Terpercaya
				</h2>
				{originCityLoading ||
				originProvinceLoading ||
				destinationCityLoading ||
				destinationProvinceLoading ? (
					[1, 2].map((_, i) => {
						return <Skeleton key={i} className="mt-5" active />;
					})
				) : originProvinceError ||
				  originCityError ||
				  destinationProvinceError ||
				  destinationCityError ? (
					"Something wrong with the API"
				) : (
					<FormProvider {...formMethods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="flex flex-col mt-4">
									<SelectInput
										formTitle="	Provinsi Asal"
										showSearch
										name="origin_province"
										extraOnChange={() => {
											setValue("origin_city", null);
										}}
										options={originProvinceData?.rajaongkir.results.map(
											(v: IRajaOngkirProvince) => {
												return {
													label: v.province,
													value: v.province_id,
												};
											}
										)}
										size="large"
										placeHolder="Provinsi Asal"
									/>
								</div>
								<div className="flex flex-col mt-4">
									{originCityFetching ? (
										<BasicSkeleton size="large" />
									) : (
										<SelectInput
											formTitle="	Kota / Kabupaten Asal"
											showSearch
											name="origin_city"
											options={originCityData?.rajaongkir.results.map(
												(v: IRajaOngkirCity) => {
													return {
														label: v.city_name,
														value: v.city_id,
													};
												}
											)}
											size="large"
											placeHolder="Kota / Kabupaten Asal"
										/>
									)}
								</div>
								<div className="flex flex-col mt-3">
									<SelectInput
										formTitle="Provinsi Tujuan"
										showSearch
										name="destination_province"
										options={destinationProvinceData?.rajaongkir.results.map(
											(v: IRajaOngkirProvince) => {
												return {
													label: v.province,
													value: v.province_id,
												};
											}
										)}
										size="large"
										extraOnChange={() => {
											setValue("destination_city", null);
										}}
										placeHolder="Provinsi Tujuan"
									/>
								</div>
								<div className="flex flex-col mt-3">
									{destinationCityFetching ? (
										<BasicSkeleton />
									) : (
										<SelectInput
											formTitle="Kota / Kabupaten Tujuan"
											showSearch
											name="destination_city"
											options={destinationCityData?.rajaongkir.results.map(
												(v: IRajaOngkirCity) => {
													return {
														label: v.city_name,
														value: v.city_id,
													};
												}
											)}
											size="large"
											placeHolder="Kota / Kabupaten Tujuan"
										/>
									)}
								</div>
								<div className="flex flex-col mt-3">
									<SelectInput
										formTitle="Kurir"
										showSearch
										name="courier"
										options={courierLists}
										size="large"
										placeHolder="Kota / Kabupaten Tujuan"
									/>
								</div>
								<div className="flex flex-col mt-3">
									<FormInput
										formTitle="Berat (Gram)"
										name="weight"
										size="large"
										placeHolder="Berat dalam gram"
										type="number"
									/>
								</div>
							</div>

							<div className="mt-5">
								<CustomButton
									buttonTitle="Cek Ongkirmu"
									htmlType="submit"
									type="primary"
									size="large"
								/>
							</div>
						</form>
					</FormProvider>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
					{costLoading ? (
						[1, 2, 3, 4].map((_, i) => {
							return <Skeleton key={i} active />;
						})
					) : costError ? (
						"Something wrong with the API"
					) : costSuccess ? (
						costData?.rajaongkir.results[0].costs.map((v, i) => {
							return <CostCard data={v} key={i} />;
						})
					) : (
						<></>
					)}
				</div>
			</Card>
		</div>
	);
};

export default LandingPage;
