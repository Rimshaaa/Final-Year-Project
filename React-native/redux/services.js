import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = getState().authReducer.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "restaurant-api",
  tagTypes: [
    "User",
    "Inventory",
    "SupplierStore",
    "SupplierCategory",
    "Bid",
    "Message",
    "Order",
    "Contract",
  ],
  endpoints: (build) => ({
    Register: build.mutation({
      query: (data) => {
        return {
          url: "/user_signup",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    Login: build.mutation({
      query: (data) => {
        return {
          url: "/user_login",
          method: "POST",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    sendOTP: build.mutation({
      query: (data) => {
        return {
          url: "/reset_password",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    verifyOTP: build.mutation({
      query: (data) => {
        return {
          url: "/reset_passcode",
          method: "PUT",
          body: data,
        };
      },
      providesTags: ["User"],
    }),
    userUpdate: build.mutation({
      query: (params) => {
        console.log(params);
        return {
          url: `/user_update/${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      providesTags: ["User"],
    }),
    getInventory: build.query({
      query: () => "/get_inventory",
      providesTags: ["Inventory"],
    }),
    addInventoryCategory: build.mutation({
      query: (data) => {
        return {
          url: "/create_category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Inventory"],
    }),
    addInventoryItem: build.mutation({
      query: (data) => {
        return {
          url: "/add_item",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Inventory"],
    }),
    deleteInventoryItem: build.mutation({
      query: (params) => {
        return {
          url: `/delete_item/${params.inventoryId}/${params.itemId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Inventory"],
    }),
    updateInventoryItem: build.mutation({
      query: (data) => {
        return {
          url: "/update_item",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Inventory"],
    }),
    createSupplierStore: build.mutation({
      query: (data) => {
        return {
          url: "/create_store",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    updateSupplierStore: build.mutation({
      query: (params) => {
        return {
          url: `/update_store/${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    deleteSupplierStore: build.mutation({
      query: (id) => {
        return {
          url: `/delete_store/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    getSupplierStore: build.query({
      query: () => "/get_store",
      providesTags: ["SupplierStore"],
    }),
    getSupplierCategories: build.query({
      query: () => "/supplier_cat",
      providesTags: ["SupplierCategory"],
      transformResponse: (response) => {
        return response.data.map((item) => {
          return { key: item._id, value: item.name };
        });
      },
    }),
    getSupplierCategoriesOr: build.query({
      query: () => "/supplier_cat",
      providesTags: ["SupplierCategory"],
    }),
    addStoreItem: build.mutation({
      query: (params) => {
        return {
          url: `/store/${params.storeId}/item`,
          method: "POST",
          body: params.data,
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    updateStoreItem: build.mutation({
      query: (params) => {
        return {
          url: `/store/${params.storeId}/item/${params.itemId}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    deleteStoreItem: build.mutation({
      query: (params) => {
        return {
          url: `/store/${params.storeId}/item/${params.itemId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["SupplierStore"],
    }),
    getSuppliers: build.query({
      query: (q) => {
        return `/get_suppliers?categoryId=${q}`;
      },
    }),
    createBidItem: build.mutation({
      query: (data) => {
        return {
          url: "/create_bid_item",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Bid"],
    }),
    getUserBids: build.query({
      query: () => "/get_bids",
      providesTags: ["Bid"],
    }),
    getBids: build.query({
      query: () => "/get_bids_all",
      providesTags: ["Bid"],
    }),
    placeBid: build.mutation({
      query: (params) => {
        return {
          url: `/place_bid/${params.id}`,
          method: "POST",
          body: params.data,
        };
      },
      invalidatesTags: ["Bid"],
    }),
    getBidders: build.query({
      query: (id) => `/get_bidders/${id}`,
      providesTags: ["Bid"],
    }),
    updateBid: build.mutation({
      query: (params) => {
        return {
          url: `/update_bid?id=${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Bid"],
    }),
    sendMessage: build.mutation({
      query: (data) => {
        return {
          url: "/messages",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Message"],
    }),
    getMessages: build.query({
      query: ({ userId, recepientId }) => `/messages/${userId}/${recepientId}`,
      providesTags: ["Message"],
    }),
    deleteMessages: build.mutation({
      query: (data) => {
        return {
          url: "delete_messages",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Message"],
    }),
    getChats: build.query({
      query: (id) => `friends-chat/${id}`,
      providesTags: ["Message"],
    }),
    deleteChat: build.mutation({
      query: ({ senderId, recepientId }) => {
        return {
          url: `/delete_chat/${senderId}/${recepientId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Message"],
    }),
    createOrder: build.mutation({
      query: (data) => {
        return {
          url: "/create_order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    chekout: build.mutation({
      query: (data) => {
        return {
          url: "/checkout",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    getOrders: build.query({
      query: () => "/get_orders",
      providesTags: ["Order"],
    }),
    getOrdersCount: build.query({
      query: () => "/orders_count",
    }),
    getSupplierOrders: build.query({
      query: () => "/get_sup_orders",
      providesTags: ["Order"],
    }),
    createContract: build.mutation({
      query: (data) => {
        return {
          url: "/create_contract",
          method: "POST",
          body: data,
        };
      },
    }),
    updateContract: build.mutation({
      query: (params) => {
        return {
          url: `/update_contract?id=${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Contract"],
    }),
    getContracts: build.query({
      query: () => "/get_contracts",
      providesTags: ["Contract"],
    }),
    updateOrder: build.mutation({
      query: (params) => {
        return {
          url: `/update_order?id=${params.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    getRatings: build.query({
      query: (id) => `/user_rating/${id}`,
    }),
    addRating: build.mutation({
      query: (params) => {
        return {
          url: `/user_rate/${params.id}`,
          method: "POST",
          body: params.data,
        };
      },
    }),
    getUnreadMessages: build.query({
      query: () => "/unread_messages",
      providesTags: ["Message"],
    }),
    markReadMessages: build.mutation({
      query: (id) => {
        return {
          url: `mark_read/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Message"],
    }),
    getNearbySuppliers: build.query({
      query: () => "/nearby_suppliers",
    }),
    addDispute: build.mutation({
      query: (data) => {
        return {
          url: "/create_dispute",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetInventoryQuery,
  useAddInventoryCategoryMutation,
  useAddInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useUserUpdateMutation,
  useCreateSupplierStoreMutation,
  useUpdateSupplierStoreMutation,
  useGetSupplierStoreQuery,
  useDeleteSupplierStoreMutation,
  useGetSupplierCategoriesQuery,
  useGetSupplierCategoriesOrQuery,
  useAddStoreItemMutation,
  useDeleteStoreItemMutation,
  useDeleteInventoryItemMutation,
  useGetSuppliersQuery,
  useCreateBidItemMutation,
  useGetUserBidsQuery,
  useGetBidsQuery,
  usePlaceBidMutation,
  useGetBiddersQuery,
  useUpdateBidMutation,
  useGetMessagesQuery,
  useDeleteMessagesMutation,
  useGetChatsQuery,
  useDeleteChatMutation,
  useCreateOrderMutation,
  useCreateContractMutation,
  useGetOrdersQuery,
  useUpdateContractMutation,
  useGetContractsQuery,
  useChekoutMutation,
  useGetSupplierOrdersQuery,
  useUpdateOrderMutation,
  useGetRatingsQuery,
  useAddRatingMutation,
  useGetUnreadMessagesQuery,
  useMarkReadMessagesMutation,
  useSendMessageMutation,
  useGetNearbySuppliersQuery,
  useUpdateStoreItemMutation,
  useGetOrdersCountQuery,
  useAddDisputeMutation,
} = api;
