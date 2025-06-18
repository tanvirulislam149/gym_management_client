import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gym-management-0fmi.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `JWT ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "auth/users/me/",
      providesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/jwt/create/",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["user"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth/users/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = userApi;
