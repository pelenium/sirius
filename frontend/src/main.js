import './style.css';

import logo from './assets/images/logo-universal.png';
import { SaveToJSON, LoadBookmarks } from "../wailsjs/go/main/App";

document.getElementById('logo').src = logo;

let bookmarks = LoadBookmarks().then(
    (result) => {
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
        }        
    }
);


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
};
