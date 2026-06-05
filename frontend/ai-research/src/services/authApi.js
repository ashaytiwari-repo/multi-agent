import API from "./api";

export const signupUser = async (userData) => {
  const res = await API.post(
    "/auth/signup",
    userData
  );

  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post(
    "/auth/login",
    userData
  );

  return res.data;
};