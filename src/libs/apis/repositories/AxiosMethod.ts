import {
	ErrorResponse,
	RawResponse,
	ValidatedResponse,
	ValidationError,
} from "@interfaces/response";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { parseCookies } from "nookies";

type THttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export default class AxiosMethod {
	private readonly errorMessage: string;
	private readonly instance: AxiosInstance;

	constructor() {
		this.errorMessage = "Terjadi kesalahan. Silahkan coba lagi";
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
		});
	}

	_tokenChecker() {
		const parsedCookies = parseCookies();
		const token = parsedCookies.TOKENID;

		if (!token) {
			return null;
		}

		// THIS LOGIC DEPENDS ON YOUR BACKEND ARCHITECTURE

		// jwt.verify(token, JWT_SECRET, (err) => {
		// 	if (err) {
		// 		destroyCookie(null, TOKEN_COOKIES);
		// 		return null;
		// 	}
		// });

		return token;
	}

	protected async _getResponse<T>(
		res: AxiosResponse
	): Promise<ValidatedResponse<T>> {
		if (res.status === 500) {
			return {
				error: "Terjadi kesalahan. Silahkan coba lagi",
				error_code: 500,
			};
		}

		const response = (await res.data.json()) as RawResponse<T>;

		if (response.code !== 200) {
			return {
				error: response.message ?? "Terjadi kesalahan. Silahkan coba lagi",
				error_code: response.code ?? 500,
				data: response.data,
			};
		}

		return {
			error: "",
			error_code: 200,
			data: response?.data,
		};
	}

	protected async _getErrorObject(error: any): Promise<ErrorResponse> {
		const errResponse = error.response;

		if (!errResponse) {
			return {
				message: "Terjadi kesalahan",
				error_code: 500,
			};
		}

		const errorData = await errResponse.json();
		return {
			message: errorData.message,
			error_code: errorData.code,
		};
	}

	/**
	 * Get method for public API
	 */
	protected async _getPublicData(url: string) {
		return this.instance.get(url);
	}

	/**
	 * CRUD method for protected API
	 */
	protected async _protectedCrudMethod(
		url: string,
		options?: {
			body?: any;
			query?: any;
			method?: THttpMethod;
			headers?: any;
		}
	) {
		const token = this._tokenChecker();

		if (token) {
			return this.instance(url, {
				...(options?.query && { searchParams: options.query }),
				headers: {
					Authorization: "Bearer " + token,
					...(options?.headers ?? {}), // Include additional headers if provided
				},

				method: options?.method ?? "post",
				params: options?.query,
				data: options?.body,
			});
		} else {
			throw {
				statusCode: 401,
				message: "Sesi login telah habis. Silahkan login ulang",
			};
		}
	}
}
