//  Imports
import baseUrl from "./base-url.js";
import { getUsers } from "./get-api.js";
// Select Dom Element
const listUsers = document.getElementById("users");
const fromUsers = document.getElementById("form-users");
const clearBtn = fromUsers.querySelector(".clear-btn");
const body = document.querySelector("body");
//   This Varaible Checkes The Button Is Clicked Now Or No
let clicked = false;
//   Show Users
const showUsers = async (e) => {
  e.preventDefault();
  const query = fromUsers.user.value.trim().toLowerCase();
  localStorage.setItem("query", query);
  //   If The User Clicked The Button Again
  //   The Error Function Will Not Work
  if (clicked) {
    return;
  }
  //   If The User Write Nothing
  //   The Error Function Will Work
  if (!query) {
    error();
    return;
  }
  //  If The User Write Something
  // The Error Function Will Not Work
  //  And The Users Will Show
  listUsers.innerHTML = `<div class="loader"></div>`;
  const usersInfo = await getUsers(query);
  if (usersInfo.items) {
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
  } else {
    // Set Error
    body.innerHTML = usersInfo;
  }
};
//  If The User Refresh The Page
// Lcal Storage Set To Empty
fromUsers.addEventListener("submit", showUsers);
if (performance.navigation && performance.navigation.type === 1) {
  localStorage.setItem("query", "");
}
//  And If The User Click The Clear Button
// The Users Remove From The Page
// And Local Storage Remove
clearBtn.addEventListener("click", () => {
  listUsers.innerHTML = "";
  clearBtn.style.display = `none`;
  localStorage.setItem("query", "");
});
// Show Users From Local Storage
//   This Function Show Users From Local Storage
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

// window.addEventListener("load", function () {
//   const navEntires = Performance.getEntriesByType("navigation");
//   if (navEntires[0].type === "reload") {
//     console.log("safhe load shod");
//   }
// });
// const entires = Performance.navigation;
// console.log(entires);
// if (entires.length > 1 && entires[0].type === "reload") {
//   console.log("safhe refresh shod");
// }
