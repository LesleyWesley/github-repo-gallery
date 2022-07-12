//Selects div where profile info appears
const overview = document.querySelector(".overview");

//Selects unordered list that displays the repos
const repoList = document.querySelector(".repo-list");

//Selects section where repo info appears
const repoSection = document.querySelector(".repos");

//Selects section where individual repo info appears
const individualRepo = document.querySelector(".repo-data");

//Selects Back to Repo Gallery button
const backToGalleryButton = document.querySelector(".view-repos");

//Selects filter input
const filterInput = document.querySelector(".filter-repos");

//My github username
const username = "LesleyWesley";

//============================================================

//Function to fetch data about my profile using Github's API

const fetchProfileData = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const parsedData = await data.json();
    console.log(parsedData);

    displayInfo(parsedData);
};

fetchProfileData();

//===========================================================

//Displays fetched data on the page

const displayInfo = function (parsedData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${parsedData.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${parsedData.name}</p>
            <p><strong>Bio:</strong> ${parsedData.bio}</p>
            <p><strong>Location:</strong> ${parsedData.location}</p>
            <p><strong>Number of Public Repos:</strong> ${parsedData.public_repos}</p>
        </div>
    `;

    overview.append(userInfo);

    fetchRepos();
};

//============================================================

//Fetches repo information from API

const fetchRepos = async function () {
    const repoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const parsedRepos = await repoData.json();
    console.log(parsedRepos);

    displayRepos(parsedRepos);
};

//=============================================================

//Displays Repo info

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");

  for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  };
};

//===========================================================

// Creates click event for repos

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
      getSpecificRepo(repoName);
    };
});

//==========================================================

//Fetches specific repo info

const getSpecificRepo = async function (repoName) {
    const specificRepoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoData.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData =  await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    };
    console.log(languages);

    displaySpecificRepo(repoInfo, languages);
};

//=========================================================

//Displays specific repo info

const displaySpecificRepo = function (repoInfo, languages) {
    individualRepo.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepo.append(div);
    individualRepo.classList.remove("hide");
    repoSection.classList.add("hide");
    backToGalleryButton.classList.remove("hide");
};

//==========================================================

//Creates click event for Back to Repo Gallery button

backToGalleryButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    individualRepo.classList.add("hide");
    backToGalleryButton.classList.add("hide");
});

//==========================================================

//Creates input event listener in input field

filterInput.addEventListener("input", function (e) {
  const search = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerSearch = search.toLowerCase();

  for (let repo of repos) {
      const lowerRepo = repo.innerText.toLowerCase();

      if (!lowerRepo.includes(lowerSearch)) {
        repo.classList.add("hide");
      } else {
        repo.classList.remove("hide");
      }
  };
});
