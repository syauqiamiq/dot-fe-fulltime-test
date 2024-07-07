// ADJUST BASED ON API CONTRACT WITH YOUR BACKEND

export interface ErrorMessage {
	message: string;
}

export interface RawResponse<T> {
	code: number;
	message: string;
	data: T;
}

export interface ErrorResponse {
	error_code: number;
	message: string;
}

export interface ValidationError {
	message: string;
	field: string;
	validation: string;
}

export interface ValidatedResponse<T> {
	error: string;
	error_code: number;
	data?: T;
}
