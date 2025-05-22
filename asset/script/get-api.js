import baseUrl from "./base-url.js";
import { baseSingle } from "./base-url.js";

// Get Users
export const getUsers = async (query) => {
  try {
    const res = await fetch(`${baseUrl}?q=${query}`);
    const users = await res.json();
    return users;
  } catch (error) {
    const er = `
      <div class="modal-error">
        <div class="in-modal-error">
          !! There is a problem with the server, please try again later
        </div>
      </div>
      `;
      return er;
    }
};
// Get Single User
export const getUser = async (userName) => {
  try {
    const response = await fetch(`${baseSingle}${userName}`);
    const user = await response.json();
    return user;
  } catch (error) {
    // Create Error
    const er = `
      <div class="modal-error">
        <div class="in-modal-error">
          !! There is a problem with the server, please try again later
        <a href="index.html">Back To Search Users</a>
        </div>
      </div>
      `;
  }
};
// Get Repsitories

export const getRepositories = async (userName) => {
  try {
    const response = await fetch(
      `${baseSingle}${userName}/repos?per_page=5&sort=created:asc`
    );
    const repositoriese = await response.json();
    return repositoriese;
  } catch (error) {
    return error;
  }
};

