document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('token')){
        window.location.href = '/';
    }

    const submit = document.getElementById("submit");
    if(submit) {
        submit.addEventListener("click", handleSubmit);
    }
});

async function handleSubmit() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const isLogin = !document.getElementById("cpassword"); // Check if we're on login page

    if (!isLogin) {
        const cpassword = document.getElementById("cpassword").value;
        if (password !== cpassword) {
            alert("Passwords don't match!");
            return;
        }
    }

    try {
        const response = await fetch(`/api/auth/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        if (json.authToken) {
            localStorage.setItem('token', json.authToken);
            window.location.href = '/';
        } else {
            alert(json.error || `${isLogin ? 'Login' : 'Signup'} failed`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`${isLogin ? 'Login' : 'Signup'} failed`);
    }
}