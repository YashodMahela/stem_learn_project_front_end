
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({   // 👈 export it here (lowercase is common convention)
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: async (headers) => {
            return new Promise((resolve) => {
                async function checkToken() {
                    const clerk = window.Clerk;
                    if (clerk) {
                        const token = await clerk.session?.getToken();
                        headers.set("Authorization", `Bearer ${token}`);
                        resolve(headers);
                    } else {
                        setTimeout(checkToken, 500);
                    }
                }
                checkToken();
            });
        },
    }),
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
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),
    }),
});


// Export hooks
export const { useGetAllProductsQuery, useGetAllCategoriesQuery, useGetAllColorsQuery, useGetFilteredProductsQuery, useGetProductByIdQuery, useCreateOrderMutation, useGetOrdersByUserIdQuery, useGetOrderStatsQuery, useGetAllOrdersQuery, useGetDailySalesQuery, useGetCheckoutSessionStatusQuery, useCreateProductMutation } = api;
