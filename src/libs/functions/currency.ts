export const rupiahFormatter = (value: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	})
		.format(value)
		.replace(",00", "");
};
