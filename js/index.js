
document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = searchInput.value.trim();
  
      if (username) {
        searchGitHub(username);
      }
    });
  
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    async function searchGitHub(username) {
      const apiUrl = `https://api.github.com/search/users?q=${username}`;
      const userData = await fetchData(apiUrl);
  
      // Clear previous results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      if (userData.items.length > 0) {
        displayUsers(userData.items);
      } else {
        userList.innerHTML = '<li>No users found</li>';
      }
    }
  
    function displayUsers(users) {
      users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.textContent = user.login;
        userItem.addEventListener('click', function () {
          showUserRepositories(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    async function showUserRepositories(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      const repositories = await fetchData(apiUrl);
  
      // Clear previous repositories
      reposList.innerHTML = '';
  
      if (repositories.length > 0) {
        displayRepositories(repositories);
      } else {
        reposList.innerHTML = '<li>No repositories found</li>';
      }
    }
  
    function displayRepositories(repositories) {
      repositories.forEach((repo) => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
    }
  });
  