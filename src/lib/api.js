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
        getAllColors: builder.query({
            query: () => "/colors",
        }),

        getFilteredProducts: builder.query({
            query: ({ category, color,  sortOrder, page = 1, limit = 20 } = {}) => {
                const params = new URLSearchParams();

                if (category && category !== 'all') params.append('category', category);
                if (color && color !== 'all') params.append('color', color);
                if (sortOrder && sortOrder !== 'asc') params.append('sortOrder', sortOrder);
                params.append('page', page);
                params.append('limit', limit);

                return `/products?${params.toString()}`;
            },
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
    }),
});

// Export hooks
export const { useGetAllProductsQuery, useGetAllCategoriesQuery, useGetAllColorsQuery, useGetFilteredProductsQuery, useGetProductByIdQuery } = api;
