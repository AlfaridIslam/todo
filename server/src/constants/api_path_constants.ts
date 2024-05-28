// import { PathParams } from "@constants/api_param_constants";

export const ROUTER_AUTH = "/auth";
export const ROUTER_TO_DO = "/todo";
//paths related to LOGIN

export const LOGIN_USER = `/login`;
export const SIGNUP_USER = `/signup`;

// paths related to after authentication

export const GET_TODOS = `/todos`;
export const GET_TODO = `/:user_id`;
export const CREATE_TODO = `/`;
export const EDIT_TODO = `/:id`;
export const DELETE_TODO = `/:id`;
export const SEARCH_TODO = `/:user_id/search`;

export const COMPLETED_TODO = `/:id/completed`;
export const INCOMPLETED_TODO = `/:id/incompleted`;
export const MARK_ALL_COMPLETED_TODO = `/:user_id/mark-all-completed`;

// GOOGLE AUTH

export const GOOGLE_PROFILE = `/auth/google`;
export const GOOGLE_LOGIN = `/auth/google/callback`;
