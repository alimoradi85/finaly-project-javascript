import baseUrl from "./base-url.js";
export const getUsers = async (query) => {
  const res = await fetch(`${baseUrl}?q=${query}`);
  const users = await res.json();
  return users;
};
