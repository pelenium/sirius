import './style.css';

import logo from './assets/images/logo-universal.png';

document.getElementById('logo').src = logo;

let title = document.getElementById("name");
title.focus();
let name = document.getElementById("link");
name.focus();
let icon = document.getElementById("icon-path");
icon.focus();

window.openForm = function () {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open-button").style.display = "none";
};

window.saveData = function () {
    console.log(title.value);
    console.log(name.value);
    console.log(icon.value);

    closeForm();
};

window.closeForm = function () {
    title.value = "";
    name.value = "";
    icon.value = "";

    document.getElementById("myForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";
};
