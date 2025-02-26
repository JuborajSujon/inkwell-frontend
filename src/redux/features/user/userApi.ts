import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/users?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    // Get a specific user by email
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // change status of user
    changeStatus: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/change-status/${id}`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    // block of user
    blockUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/block-user/${id}`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    // Update a specific user by ID
    updateUserProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/update-profile/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["Users", "User"],
    }),

    // Update a specific user photo by ID
    updateUserProfilePhoto: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/update-profile-photo/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useChangeStatusMutation,
  useBlockUserMutation,
  useUpdateUserProfileMutation,
  useUpdateUserProfilePhotoMutation,
} = userApi;
