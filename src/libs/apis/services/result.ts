import { ErrorMessage } from "@interfaces/response";

export class Result<T> {
	public isSuccess: boolean;
	public isFailure: boolean;
	public error: ErrorMessage;
	private readonly _value?: T;

	private constructor(
		isSuccess: boolean,
		{ error, value }: { error?: ErrorMessage; value?: T }
	) {
		if (isSuccess && error) {
			throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
		}
		if (!isSuccess && !error) {
			throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
		}

		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;
		this.error = error ?? { message: "Terjadi Kesalahan. Silahkan coba lagi" };
		this._value = value;

		Object.freeze(this);
	}

	public getValue(): T {
		if (!this.isSuccess) {
			throw new Error(`Cant retrieve the value from a failed result.`);
		}

		//@ts-ignore
		return this._value;
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, { value });
	}

	public static fail<U>(error?: string): Result<U> {
		return new Result<U>(false, { error: { message: error ?? "" } });
	}

	public static combine(results: Result<any>[]): Result<any> {
		for (const result of results) {
			if (result.isFailure) return result;
		}
		return Result.ok<any>();
	}
}
