import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
});

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "employees",
    }),
  }),
});

export const { useGetAllEmployeesQuery } = employeesApi;
