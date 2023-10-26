import './style.css';

import logo from './assets/images/logo-universal.png';
import { SaveToJSON, LoadBookmarks } from "../wailsjs/go/main/App";

document.getElementById('logo').src = logo;

updateBookmarksView();

let name = document.getElementById("name");
let link = document.getElementById("link");
let icon = document.getElementById("icon-path");
name.focus();
name.focus();
icon.focus();

window.openForm = function () {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open-button").style.display = "none";
};

window.saveData = function () {
    SaveToJSON(name.value, link.value, icon.value);

    closeForm();

    bookmarks = LoadBookmarks();
};

window.closeForm = function () {
    name.value = "";
    link.value = "";
    icon.value = "";

    document.getElementById("myForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";

    updateBookmarksView();
};

function updateBookmarksView() {
    document.getElementById("list").innerHTML = "";

    let bookmarks = LoadBookmarks().then(
        (result) => {
            for (let i = 0; i < result.length; i++) {
                const li = document.createElement('li');
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <h2>${result[i].name}</h2>
                    <a>${result[i].link}</a>
                    <h3>${result[i].icon}</h3>
                `;
                li.appendChild(card)
                list.appendChild(li);
            }
        }
    );
}