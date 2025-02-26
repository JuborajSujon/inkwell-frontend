import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getAllProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/products?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    // Get a specific product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "products/create-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update a specific product by ID
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // Delete a specific product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
