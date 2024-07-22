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
import { rupiahFormatter } from "@libs/functions";
import { Card, Skeleton } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, formSchema } from "../constants/form-constant";

const LandingPage = () => {
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
			.then((res) => {})
			.catch((err) => {});
	};
	return (
		<div className="bg-white flex w-full min-h-[100vh] justify-center items-center">
			<Card className="border-2 rounded-lg shadow-lg min-w-[1000px] min-h-[400px]">
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
					<>
						<Skeleton className="mt-5" active />
						<Skeleton className="mt-2" active />
					</>
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
						<>
							<Skeleton active />
							<Skeleton active />
							<Skeleton active />
							<Skeleton active />
						</>
					) : costError ? (
						"Something wrong with the API"
					) : costSuccess ? (
						costData?.rajaongkir.results[0].costs.map((v, i) => {
							return (
								<Card
									key={i}
									className="mt-2 border-2 rounded-lg shadow-lg w-full min-h-[100px]"
								>
									<h3 className=" text-gray-400 font-poppins font-semibold text-lg">
										{v.service} ({v.cost[0].etd} Hari)
									</h3>
									<h4 className="font-poppins font-normal text-sm">
										{v.description}
									</h4>
									<h5 className="font-poppins font-medium text-4xl mt-2">
										{rupiahFormatter(v.cost[0].value)}
									</h5>
								</Card>
							);
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
