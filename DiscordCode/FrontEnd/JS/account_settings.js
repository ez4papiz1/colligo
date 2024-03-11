const e = require("express");

document.addEventListener('DOMContentLoaded', function() {
    function fetchUserInfo() {
        fetch('temp') //Awaiting Back-End creation for users Data
            .then(response => response.json())
            .then(data => DisplayUserInfo(data)); //Temp data until back-end is created
    }
    function DisplayUserInfo(users) {
           const usernameElement = document.getElementsByClassName('username');
            usernameElement.textContent += users.username;
            const emailElement = document.getElementsByClassName('email');
            emailElement.textContent += users.email;  
    }
});
