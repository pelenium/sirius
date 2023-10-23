import './style.css';

import logo from './assets/images/logo-universal.png';
import { SaveToJSON } from "../wailsjs/go/main/App";

document.getElementById('logo').src = logo;

let name = document.getElementById("name");
name.focus();
let link = document.getElementById("link");
name.focus();
let icon = document.getElementById("icon-path");
icon.focus();

window.openForm = function () {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open-button").style.display = "none";
};

window.saveData = function () {
    console.log(name.value);
    console.log(link.value);
    console.log(icon.value);

    SaveToJSON(name.value, link.value, icon.value);

    closeForm();
};

window.closeForm = function () {
    name.value = "";
    link.value = "";
    icon.value = "";

    document.getElementById("myForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";
};
