const axios = require("axios");

const state = {};

const usersList = document.querySelector("#users-list");
const pager = document.querySelector("#pager");

window.addEventListener("hashchange", () => {
  fetchUsers();
});

const renderPager = () => {
  const idx = window.location.hash.slice(1)*1;

  const pageCount = Math.ceil(state.count / 50);
  let html = "";
  for (let i = 0; i < pageCount; i++) {
    html += `
        <li class='${idx === i ? 'selected': ''}'>
            <a href='#${i}'>
                ${i + 1}
            </a>
        </li>`;
  }
  pager.innerHTML = html;
};

const renderUsers = () => {
  const html = state.users
    .map((user) => {
      return `
            <li>
                ${user.fullName}
            </li>    
        `;
    })
    .join("");
  usersList.innerHTML = html;
};

const fetchUsers = async () => {
  const idx = window.location.hash.slice(1);
  const response = await axios.get(`https://www.acme-api.com/api/users/${idx}`);

  const data = response.data;
  state.count = data.count;
  state.users = data.users;
  renderUsers();
  renderPager();
};

fetchUsers();
