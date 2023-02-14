import { api } from "./api";

interface UserParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface passwordParams {
  currentPassword: string;
  newPassword: string;
}

export const ProfileService = {
  fetchProfile: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res.data;
  },

  userUpadate: async (params: UserParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }

        return error;
      });

    return res.status;
  },

  passwordUpdate: async (params: passwordParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/current/password",  params,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }

        return error;
      });

    return res.status;
  },
};
