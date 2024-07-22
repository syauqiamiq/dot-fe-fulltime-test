// THIS FOLDER FOR GLOBAL CONFIG VARIABLE
export const API_BASE_URL =
	(process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
	"http://localhost:8000/api/v1";
