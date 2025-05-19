// Import
import { getUser, getRepositories } from "./get-api.js";
// Select Dom Element
const isHireable = document.querySelector(".is-hireable");
const body = document.querySelector("body");
const userProfile = document.querySelector(".user-image");
const userSelfName = document.querySelector(".user-name");
const userAdress = document.querySelector(".user-adress");
const aboutUser = document.querySelector(".about-user");
const activitiesUser = document.querySelector(".user-activities");
const repositoryElements = document.querySelector(".user-repositories");
// Get User Name From Before Page
const locationHref = window.location.href;
const userName = locationHref.split("?")?.at(1).split("=")?.at(1);
//   Set Loader For Part Of Site
aboutUser.innerHTML = `<div class="loader"></div>`;
activitiesUser.innerHTML = `<div class="loader"></div>`;

//  Show User
const showUser = async (userName) => {
  const user = await getUser(userName);
  if (user.login) {
    aboutUser.innerHTML = "";
    activitiesUser.innerHTML = "";
    if (user.hireable) {
      isHireable.innerHTML = `<i class="fa-solid fa-check check"></i>`;
    }
    // Set Profile User
    userProfile.src = user.avatar_url;
    userSelfName.innerText = user.name;
    userAdress.innerText = user.location;
    // Set More Info
    if (user.bio) {
      aboutUser.innerHTML += `<span class="user-bio">bio :</span> ${user.bio}`;
    }
    if (user.login) {
      aboutUser.innerHTML += `<a href="https://github.com/${user.login}" class="user-github">Visit Github Page</a>`;
      aboutUser.innerHTML += `<span>login : ${user.login}</span>`;
    }
    if (user.company) {
      aboutUser.innerHTML += `<span>company : ${user.company}</span>`;
    }
    if (user.blog) {
      aboutUser.innerHTML += `<span>Website : ${user.blog}</span>`;
    }
    // Set Activities User
    activitiesUser.innerHTML += `
            <span>Followers : ${user.followers}</span>
            <span>Following : ${user.following}</span>
            <span>Public Repos : ${user.public_repos}</span>
            <span>Public Gists : ${user.public_gists}</span> 
        `;
  } else {
    // Set Error
    body.innerHTML = user;
  }
};
// Show Repsitories
const showRepositories = async () => {
  const repositoriese = await getRepositories(userName);
  const user = await getUser(userName);
  const userLogin = user.login;
  repositoriese.forEach((repo) => {
    repositoryElements.innerHTML += `
                <div class="repository">
                    <a href="https://github.com/${userLogin}/${repo.name}">${repo.name}</a>
                </div>
            `;
  });
};
showUser(userName);
showRepositories();
