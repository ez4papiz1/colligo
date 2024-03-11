
/** @jest-environment jsdom */
function DisplayUserInfo(users) {
    const usernameElement = document.getElementsByClassName('username');
     usernameElement.textContent += users.username;
     const emailElement = document.getElementsByClassName('email');
     emailElement.textContent += users.email;  
}
test('DisplayUserInfo displays the username and email', () => {
    document.body.innerHTML = '<h2 class="username"></h2><h2 class="email"></h2>';
    const userInfo = { username: 'User 1', email: 'test@gmail.com'};
    DisplayUserInfo(userInfo);
    const usernameElement = document.querySelector('.username');
    const emailElement = document.querySelector('.email');
    expect(usernameElement.textContent).toBe(userInfo.username);
    expect(emailElement.textContent).toBe(userInfo.email);
}); 

