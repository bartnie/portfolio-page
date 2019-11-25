"use strict";

const projectLists = document.querySelector(".projects__list--js");
const gitHubProjectsUrl =
  "https://api.github.com/users/bartnie/repos?sort=updated";
const emptyDescriptionDefault = "No description available";


function clearProjectLists() {
  projectLists.innerHTML = "";
}

function setGitHubProjects() {
  fetch(gitHubProjectsUrl)
    .then(resp => {
      populateProjectsList(resp.json());
    })
    .catch(err => {
      console.log(`Error getting repositories data from GitHub API: ${err}`);
    });
}

function populateProjectsList(response) {
  response.then(repositories => {
    repositories.forEach(populateWithListItem);
  });
}

function populateWithListItem(repository) {
  console.log(repository);
  var listItem = prepareListItem(repository);
  console.log(listItem);
  projectLists.innerHTML += listItem;
}

function prepareListItem(repository) {
  var name = repository.name;
  var description = repository.description;
  var demoUrl = repository.homepage;
  var gitHubUrl = repository.html_url;
  return `<li class="project">
    <div class="project__content">
      <img src="assets/img/github-logo.svg" class="project__image"/>
      <h4 class="project__heading">${name}</h4>
      <p class="project__description">${description ? description : emptyDescriptionDefault}</p>
    </div>
    <div class="project__links">
      ${demoUrl ? "<img src=\"assets/img/demo-link-icon.svg\" class=\"project__icon\" alt=\"Icon for demo link - shape of a monitor\"><a class=\"project__link project__link--demo\" href=\""+ demoUrl +"\">Demo</a>" : ""}
      <img src="assets/img/github-link-icon.svg" class="project__icon" alt="Icon for github link - shape resembling terminal icon">
      <a class="project__link project__link--github" href="${gitHubUrl}">Github</a>
    </div>
  </li>`;
  }

clearProjectLists();
setGitHubProjects();
