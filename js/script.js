//Selects div where profile info appears
const overview = document.querySelector(".overview");

//My github username
const username = "LesleyWesley";

//============================================================

//Function to fetch data about my profile using Github's API

const fetchData = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const parsedData = await data.json();
    console.log(parsedData);

    displayInfo(parsedData);
};

fetchData();

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
};
