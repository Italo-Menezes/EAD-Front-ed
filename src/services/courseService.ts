import { api } from "./api";

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};

export type CouseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

export const courseService = {
  getNewstCourses: async () => {
    const res = await api.get("/courses/newest").catch((err) => {
     

      return err.response;
    });

    return res;
  },
  getFeaturedCourses: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },

  AddToFavorite: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .post(
        "/favorites",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },

  getFavCourse: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },
  like: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .post(
        "/likes",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },
  getEpsides: async (id: string | number) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);

        return err.response;
      });

    return res;
  },
};
