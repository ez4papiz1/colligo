
const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    let u = signupForm.get("name");
    let p = signupForm.get("password");
    let rp = signupForm.get("repassword")
    let mail = signupForm.get("email");
    let pfp = signupForm.get("image");
    if(p !== rp) {
        throw new Error("Password's do not match")
    }

}
