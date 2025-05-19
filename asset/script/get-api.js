import baseUrl from "./base-url.js";
import { baseSingle } from "./base-url.js";
// Get Users
export const getUsers = async (query) => {
  try {
    const res = await fetch(`${baseUrl}?q=${query}`);
    const users = await res.json();
    return users;
  } catch (error) {
    return error;
  }
};
// Get Single User
export const getUser = async (userName) => {
  try {
    const response = await fetch(`${baseSingle}${userName}`);
    const user = await response.json();
    return user;
  } catch (error) {
    return error;
  }
};
// Get Repsitories

export const getRepositories = async (userName) => {
  const response = await fetch(
    `${baseSingle}${userName}/repos?per_page=5&sort=created:asc`
  );
  const repositoriese = await response.json();
  return repositoriese;
};
