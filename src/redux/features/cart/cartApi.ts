import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all cart
    getAllCart: builder.query({
      query: () => {
        return {
          url: `/carts/my-add-to-cart-list`,
          method: "GET",
        };
      },
      providesTags: ["Carts", "Cart"],
    }),

    // Create and update a new cart
    createAndUpdateCart: builder.mutation({
      query: (productData) => ({
        url: "/carts/create-and-update-cart",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Carts", "Cart"],
    }),

    // Delete a specific cart by ID
    deleteSingleCart: builder.mutation({
      query: (id) => ({
        url: `/carts/delete-single-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts", "Cart"],
    }),

    // Delete a specific cart
    deleteCart: builder.mutation({
      query: () => ({
        url: `/carts/delete-all-cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Carts"],
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useCreateAndUpdateCartMutation,
  useDeleteSingleCartMutation,
  useDeleteCartMutation,
} = cartApi;
