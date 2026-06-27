import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),

  tagTypes: ["Auth", "Users", "Skills", "Education", "Experience", "Project"],

  endpoints: (builder) => ({

    // =========================
    // 🔐 AUTH
    // =========================

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // =========================
    // 👤 USERS
    // =========================

    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // =========================
    // 🧠 SKILLS API
    // =========================

    getAllSkills: builder.query({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),

    getSkillById: builder.query({
      query: (id) => `/skills/${id}`,
      providesTags: ["Skills"],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skills/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),

    updateSkill: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/skills/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    // =========================
    // 🎓 EDUCATION API
    // =========================

    getAllEducation: builder.query({
      query: () => "/education",
      providesTags: ["Education"],
    }),

    getEducationById: builder.query({
      query: (id) => `/education/${id}`,
      providesTags: ["Education"],
    }),

    createEducation: builder.mutation({
      query: (data) => ({
        url: "/education/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),

    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Education"],
    }),

    // =========================
    // 💼 EXPERIENCE API
    // =========================

    getAllExperience: builder.query({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),

    getExperienceById: builder.query({
      query: (id) => `/experience/${id}`,
      providesTags: ["Experience"],
    }),

    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    updateExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/experience/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),

    // =========================
    // 📁 PROJECT API
    // =========================

    getAllProject: builder.query({
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: ["Project"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/projects/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

// =========================
// EXPORT HOOKS
// =========================

export const {
  useLoginMutation,
  useLogoutMutation,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // SKILLS
  useGetAllSkillsQuery,
  useGetSkillByIdQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,

  // EDUCATION
  useGetAllEducationQuery,
  useGetEducationByIdQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,

  // EXPERIENCE
  useGetAllExperienceQuery,
  useGetExperienceByIdQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,

  // PROJECT
  useGetAllProjectQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = authApi;