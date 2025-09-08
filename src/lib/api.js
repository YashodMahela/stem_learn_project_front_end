
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({   // 👈 export it here (lowercase is common convention)
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
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
            query: ({ category, color, sortOrder, page = 1, limit = 20 } = {}) => {
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

        createOrder: builder.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
        }),
        getOrdersByUserId: builder.query({
            query: (userId) => `/orders/by-user/${userId}`,
        }),        
        getOrderStats: builder.query({
            query: () => `/orders/stats`,
        }),
        getAllOrders: builder.query({
            query: (status) => {
                const params = status ? `?status=${status}` : "";
                return `/orders${params}`;
            },
        }),
        getDailySales: builder.query({
            query: (range = 7) => {
                return `/orders/daily-sales?range=${range}`;
            },
            providesTags: ['DailySales'],
            keepUnusedDataFor: 300,
        }),
        getCheckoutSessionStatus: builder.query({
            query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
        }),
    }),
});


// Export hooks
export const { useGetAllProductsQuery, useGetAllCategoriesQuery, useGetAllColorsQuery, useGetFilteredProductsQuery, useGetProductByIdQuery, useCreateOrderMutation, useGetOrdersByUserIdQuery, useGetOrderStatsQuery, useGetAllOrdersQuery, useGetDailySalesQuery, useGetCheckoutSessionStatusQuery } = api;
