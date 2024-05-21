import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
});

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "/employees",
    }),
    getCurrentEmployee: builder.query({
      query: ({ id }) => `/employees/${id}`,
    }),
    addEmployee: builder.mutation({
      query: ({ name, isArchive, role, phone, birthday }) => ({
        url: "employees",
        method: "POST",
        body: {
          name,
          isArchive,
          role,
          phone,
          birthday,
        },
      }),
    }),
    changeEmployee: builder.mutation({
      query: ({ id, name, isArchive, role, phone, birthday }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: {
          name,
          isArchive,
          role,
          phone,
          birthday,
        },
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useChangeEmployeeMutation,
  useGetCurrentEmployeeQuery,
} = employeesApi;
