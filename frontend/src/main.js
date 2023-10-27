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
    let bookmarks = SaveToJSON(name.value, link.value, icon.value).then(
        (result) => {
            if (result === true) {
                closeForm();

                bookmarks = LoadBookmarks();
                link.style.background = 'white';
                icon.style.background = 'white';
            } else {
                document.getElementById("link").style.background = '#FA8072';
                document.getElementById("icon-path").style.background = '#FA8072';
            }
        });
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
                    <a href="${result[i].link}"><img src="${result[i].icon}"/><h2>${result[i].name}</h2></a>
                `;
                li.appendChild(card)
                list.appendChild(li);
            }
        }
    );
}