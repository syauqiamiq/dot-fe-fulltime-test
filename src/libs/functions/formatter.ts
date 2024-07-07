export function priceFormatter(price: number | string, isZero = true): string {
	if (!price) {
		return isZero ? "Rp 0" : "Gratis";
	} else if (typeof price === "string") {
		return `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(price, 10))}`;
	} else {
		return `Rp ${new Intl.NumberFormat("id-ID").format(price)}`;
	}
}

export function createMarkup(html?: string): { __html: string } {
	return { __html: html ?? "" };
}

export function textShortener(text: string, limit: number): string {
	if (!text) {
		return "-";
	}

	if (text.length > limit) {
		return `${text.substr(0, limit)}...`;
	} else {
		return text;
	}
}

export function timeConverter(seconds: number) {
	if (isNaN(seconds)) {
		return `00:00`;
	}
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = date.getUTCSeconds().toString().padStart(2, "0");
	if (hh) {
		return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
	}
	return `${mm}:${ss}`;
}

export function pad(num: number) {
	let str: any;

	if (num === undefined) {
		str = 0;
	} else {
		str = num.toString();
	}

	let newNum;
	if (str.length === 1) {
		newNum = str.padStart(2, "0");
	} else {
		newNum = num;
	}

	return newNum;
}

export function timeAgo(date: Date) {
	const now = new Date().getDate();
	const currentTime = date.getTime();

	const diff = (now - currentTime) / 1000;

	if (diff < 60) {
		const v = Math.round(diff);
		return v < 10 ? "Baru saja" : "Beberapa Detik yang lalu";
	} else if (diff < 60 * 60) {
		const v = Math.round(diff / 60);
		return v + " Menit yang lalu";
	} else if (diff < 60 * 60 * 24) {
		const v = Math.round(diff / (60 * 60));
		return v + " Jam yang lalu";
	} else if (diff < 60 * 60 * 24 * 30.436875) {
		const v = Math.round(diff / (60 * 60 * 24));
		return v + " Hari yang lalu";
	} else if (diff < 60 * 60 * 24 * 30.436875 * 12) {
		const v = Math.round(diff / (60 * 60 * 24 * 30.436875));
		return v + " Bulan yang lalu";
	}
	const v = Math.round(diff / (60 * 60 * 24 * 30.436875 * 12));
	return v + " Tahun yang lalu";
}
