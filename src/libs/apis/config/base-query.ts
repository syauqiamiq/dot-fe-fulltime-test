"use client";

import { API_BASE_URL } from "@configs/api-config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	endpoints: () => ({}),
});
