import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://inkwell-backend.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

interface RefreshTokenResponse {
  data?: {
    accessToken?: string;
  };
}

interface ErrorResponse {
  message?: string;
}

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status, data } = result.error as FetchBaseQueryError & {
      data?: ErrorResponse;
    };

    if (status === 404 || status === 403) {
      toast.error(data?.message || "An error occurred");
    }

    if (status === 401) {
      try {
        const res = await fetch(
          "https://inkwell-backend.vercel.app/api/auth/refresh-token",
          {
            method: "POST",
            credentials: "include",
          }
        );

        const refreshData: RefreshTokenResponse = await res.json();

        if (refreshData?.data?.accessToken) {
          const user = (api.getState() as RootState).auth.user;

          api.dispatch(
            setUser({
              user,
              token: refreshData.data.accessToken,
            })
          );

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch (error) {
        console.error("Refresh token request failed:", error);
        api.dispatch(logout());
      }
    }
  }

  return {
    ...result,
    meta: undefined,
  };
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Product",
    "User",
    "Users",
    "Products",
    "Orders",
    "Order",
    "Cart",
    "Carts",
  ],
  endpoints: () => ({}),
});
