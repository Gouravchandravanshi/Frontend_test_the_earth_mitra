import { apiSlice } from "./api";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (data) => ({ url: "/orders/create-razorpay-order", method: "POST", body: data }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({ url: "/orders/verify-payment", method: "POST", body: data }),
      invalidatesTags: ["Order", "Cart"],
    }),
    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;