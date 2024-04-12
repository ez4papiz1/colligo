document.addEventListener('DOMContentLoaded', function() {
    fetchUserInfo();
    const passwordButton = document.getElementById('change-password');
    passwordButton.addEventListener('click', function() {
        window.location.href = '/changePassword';
    });
    const emailButton = document.getElementById('change-email');
    emailButton.addEventListener('click', function() {
            window.location.href = '/changeEmail';
    });
    const usernameButton = document.getElementById('change-username');
    usernameButton.addEventListener('click', function() {
        window.location.href = '/changeUsername';
    });
    const form = document.getElementById('updateEmailForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        
    });
    function fetchUserInfo() {
        fetch('/fetchUserData')
            .then(response => response.json())
            .then(data => displayUserInfo(data));
    }
    function displayUserInfo(userData) {
        const emailElement = document.querySelector('.form-container');
        emailElement.innerHTML = `<h4>User Information</h4>
                                   <p>Username: ${userData.username}</p>
                                   <p>Email: ${userData.email}</p>
                                   <p>Password: ${userData.password}</p>`;
    }

});
