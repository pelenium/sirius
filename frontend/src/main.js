import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import {Greet} from '../wailsjs/go/main/App';

document.getElementById('logo').src = logo;

let nameElement = document.getElementById("name");
nameElement.focus();
let resultElement = document.getElementById("result");

window.greet = function () {
    let name = nameElement.value;

    if (name === "") return;

    try {
        Greet(name)
            .then((result) => {
                resultElement.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};
