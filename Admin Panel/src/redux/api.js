import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:3333/api/v1";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "neighbour-api",
  tagTypes: ["Sup", "Res", "Order", "User"],
  endpoints: (build) => ({
    Register: build.mutation({
      query: (data) => {
        return {
          url: "/user_register",
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
    userUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/user_update/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["Res", "Sup", "User"],
    }),
    pictureUpload: build.mutation({
      query: (imageFile) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", imageFile);
        console.log({ bodyFormData, imageFile });
        return {
          url: "/picture_upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
    getSuppliers: build.query({
      query: () => "/admin_suppliers",
      providesTags: ["Sup"],
    }),
    getRestaurants: build.query({
      query: () => "/admin_restaurants",
      providesTags: ["Res"],
    }),
    deleteAccount: build.mutation({
      query: (id) => {
        return {
          url: `/admin_delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Sup", "Res"],
    }),
    getAnalytics: build.query({
      query: () => "/user_analytics",
    }),
    getContracts: build.query({
      query: () => "/admin_contracts",
    }),
    getOrders: build.query({
      query: () => "/admin_orders",
      providesTags: ["Order"],
    }),
    getFeaturedInfo: build.query({
      query: () => "/featured_info",
      providesTags: ["User"],
    }),
    getApprovalUsers: build.query({
      query: () => "/admin_approvel",
      providesTags: ["User"],
    }),
    updateOrder: build.mutation({
      query: (param) => {
        return {
          url: `/update_watch/${param.id}`,
          method: "PUT",
          body: param.data,
        };
      },
      invalidatesTags: ["Watch"],
    }),
    getDisputes: build.query({
      query: () => "/get_disputes",
    }),
  }),
});

export const {
  useLoginMutation,
  useGetRestaurantsQuery,
  useGetSuppliersQuery,
  useUserUpdateMutation,
  useDeleteAccountMutation,
  useGetAnalyticsQuery,
  useGetContractsQuery,
  useGetOrdersQuery,
  useGetFeaturedInfoQuery,
  useGetApprovalUsersQuery,
  useGetDisputesQuery,
} = api;

export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${baseURL}/picture_upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        resolve(response.imageUrls);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
