
const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    let u = signupForm.get("name");
    let p = signupForm.get("password");
}
