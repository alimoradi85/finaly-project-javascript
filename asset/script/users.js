//  Imports
import baseUrl from "./base-url.js";
import { getUsers } from "./get-api.js";
// Select Dom Element
const listUsers = document.getElementById("users");
const fromUsers = document.getElementById("form-users");
const clearBtn = fromUsers.querySelector(".clear-btn");

//   This Varaible Checkes The Button Is Clicked Now Or No
let clicked = false;
//   Show Users
const showUsers = async (e) => {
  e.preventDefault();
  const query = fromUsers.user.value.trim().toLowerCase();
  localStorage.setItem("query", query);

  if (clicked) {
    return;
  }
  if (!query) {
    error();
    return;
  }
  listUsers.innerHTML = `<div class="loader"></div>`;
  const usersInfo = await getUsers(query);
  const users = usersInfo.items;
  listUsers.innerHTML = "";
  users.forEach((user) => {
    const userAvator = user.avatar_url;
    const userLogin = user.login;
    listUsers.innerHTML += `
          <li>
            <img src="${userAvator}" alt="this is users\'s profile" />  
            <h3>${userLogin}</h3>
            <a href="single-user.html?user=${userLogin}">More</a>
          </li>
          `;
  });
  clearBtn.style.display = `block`;
  fromUsers.user.value = "";
};

fromUsers.addEventListener("submit", showUsers);

// Clear Buuton
clearBtn.addEventListener("click", () => {
  listUsers.innerHTML = "";
  clearBtn.style.display = `none`;
  localStorage.setItem("query", "");
});

const showUsersFromLocal = async () => {
  const queryLocal = localStorage.getItem("query");

  if (queryLocal) {
    listUsers.innerHTML = `<div class="loader"></div>`;
    const usersInfo = await getUsers(queryLocal);
    const users = usersInfo.items;
    listUsers.innerHTML = "";
    users.forEach((user) => {
      const userAvator = user.avatar_url;
      const userLogin = user.login;
      listUsers.innerHTML += `
          <li>
            <img src="${userAvator}" alt="this is users\'s profile" />  
            <h3>${userLogin}</h3>
            <a href="single-user.html?user=${userLogin}">More</a>
          </li>
          `;
    });
    clearBtn.style.display = `block`;
    fromUsers.user.value = "";
    localStorage.setItem("query", "");
  }
};
showUsersFromLocal();

// Error Search
const error = () => {
  const div = document.createElement("div");
  div.classList.add("error");
  div.innerText = "!! Please write a userName";
  fromUsers.before(div);
  clicked = true;
  setTimeout(() => {
    clicked = false;
    div.remove();
  }, 3000);
};
