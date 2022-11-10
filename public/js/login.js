const loginForm = async (event) => {
    event.preventDefault();

    const email = document.querySelector('usernameLogin').value.trim();
    const password = document.querySelector('passwordLogin').Value.trim();

    if(username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            header: {'content-Type': 'application/json'}
        });
        if(response.ok) {
            console.log('you are now logged in')
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText);
        }
    }
}
console.log(body)
document.querySelector('#loginForm').addEventListener('submit', loginForm);