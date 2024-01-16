const form = document.querySelector('form');
const input = document.querySelector('search');
const ul = document.querySelector('github-container');


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchValue = input.value;
  const response = await fetch(`https://api.github.com/search/users?q=${searchValue}`);
  const data = await response.json();
  const users = data.items;
  ul.innerHTML = '';
  users.forEach(async (user) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const a = document.createElement('a');
    img.src = user.avatar_url;
    img.alt = `${user.login}'s avatar`;
    a.href = user.html_url;
    a.textContent = user.login;
    li.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);
    li.addEventListener('click', async () => {
      const response = await fetch(`https://api.github.com/users/${user.login}/repos`);
      const data = await response.json();
      const repos = data.map((repo) => repo.name);
      const ul = document.createElement('ul');
      repos.forEach((repo) => {
        const li = document.createElement('li');
        li.textContent = repo;
        ul.appendChild(li);
      });
      li.appendChild(ul);
    });
  });
});

