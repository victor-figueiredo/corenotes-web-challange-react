import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 1 / 24 });
};

export const isAuthenticated = () => {
  const token = Cookies.get("token");
  return token ? true : false;
};

export const destroyToken = () => {
  Cookies.remove("token");
};
