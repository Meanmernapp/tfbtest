import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.PROD
  ? import.meta.env.VITE_API
  : import.meta.env.VITE_API_URL;
export const query = createApi({
  reducerPath: "query",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 120,
  tagTypes: ["Campaign"],
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (url) => ({
        url,
        method: "Get",
      }),
      providesTags: ["Campaign"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useGetCampaignsQuery, useCreateUserMutation } = query;
