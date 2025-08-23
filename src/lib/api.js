import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({   // 👈 export it here (lowercase is common convention)
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/products",
        }),
        getAllCategories: builder.query({
            query: () => "/categories",
        }),
    }),
});

// Export hooks
export const { useGetAllProductsQuery, useGetAllCategoriesQuery } = api;
