//Selects div where profile info appears
const overview = document.querySelector(".overview");

//Selects unordered list that displays the repos
const repoList = document.querySelector(".repo-list");

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
  for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  };
};
