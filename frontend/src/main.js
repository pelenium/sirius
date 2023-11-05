import './style.css';

import logo from './assets/images/logo.png';
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
    SaveToJSON(name.value, link.value, icon.value).then(
        (result) => {
            if (result === true) {
                closeForm();
                link.style.background = 'white';
                icon.style.background = 'white';
            } else {
                document.getElementById("link").style.background = '#FA8072';
                document.getElementById("icon-path").style.background = '#FA8072';
            }
            updateBookmarksView(); // Обновляем список закладок
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
    const list = document.getElementById("list");
    // Очистим список закладок перед добавлением новых элементов
    list.innerHTML = "";
    
    LoadBookmarks().then((result) => {
        for (let i = 0; i < result.length; i++) {
            const bookmark = result[i];
            const button = document.createElement('button');
            button.className = 'card';
            button.innerHTML = `<img src="${bookmark.icon}"/><h2>${bookmark.name}</h2>`;

            // Добавляем обработчик нажатия для кнопки
            button.addEventListener("click", function () {
                // Здесь можно добавить логику обработки нажатия на закладку
                // Например, перейти по ссылке bookmark.link
                window.open(bookmark.link, '_blank');
            });

            list.appendChild(button);
        }
    });
}
