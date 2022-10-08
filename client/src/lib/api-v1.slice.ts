import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiV1Slice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/client" }),
  endpoints: () => ({}),
});
